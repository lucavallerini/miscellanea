# coding=utf-8
# Script per il calcolo della giacenza media di un conto corrente
# a partire dall'elenco movimenti.
#
# E' supportato sia il calcolo ai fini ISEE (giacenze in data valuta)
# sia il calcolo ai fini dell'imposta di bollo (giacenze in data contabile).
#
# Il file dei movimenti e' in formato Excel, esportato dal form di ricerca
# movimenti del conto corrente Fineco.
#
# Il risulta dello script viene salvato in un file di testo nel quale
# viene riportato il saldo finale, la giacenza media finale e i saldi
# e le giacenze complessive.
#
# Autore: Luca Vallerini
# Data: 2017-09-20
# Ultimo aggiornamento: 2017-09-24

from __future__ import print_function
import pandas
import decimal
import os
# import PyPDF2 as pdf


# Formato Excel Fineco
date = ('Data Operazione', 'Data Valuta')
formato_date = '%d/%m/%Y'
flusso_movimento = ('Entrate', 'Uscite')
righe_da_saltare = 7
riga_intestazione = 0
numero_colonne_utili = 4


def carica_movimenti(file_movimenti, valuta=True):
    movimenti = pandas.read_excel(io=file_movimenti,
                                  header=riga_intestazione,
                                  skiprows=righe_da_saltare,
                                  dtype={flusso_movimento[0]: decimal.Decimal,
                                         flusso_movimento[1]: decimal.Decimal}).iloc[:, :numero_colonne_utili]

    for x in date:
        movimenti[x] = pandas.to_datetime(movimenti[x], format=formato_date)

    for x in flusso_movimento:
        movimenti[x] = movimenti[x].fillna(0)

    if valuta:
        return movimenti.sort_values(date[1]).groupby(date[1]).sum().reset_index(0).iloc[:, :]
    else:
        return movimenti.sort_values(date[0]).groupby(date[0]).sum().reset_index(0).iloc[:, :]


# In ingresso un dataframe di tre colonne: 'data', 'entrate', 'uscite'
def calcola_giacenza_media(movimenti, year, start_month=1, end_month=12, start_day=1, end_day=31, saldo_iniziale=0.00):
    inizio_periodo_attuale = inizio_periodo = pandas.Timestamp(year, start_month, start_day)
    fine_periodo = pandas.Timestamp(year, end_month, end_day)
    giorni_periodo = (fine_periodo - inizio_periodo).days + 1
    saldi_parziali = []
    ultimo_saldo = saldo_iniziale

    for i in range(0, movimenti.shape[0]):
        data_movimento_attuale = movimenti.iloc[i, 0]

        if data_movimento_attuale < inizio_periodo:
            ultimo_saldo += movimenti.iloc[i, 1] - movimenti.iloc[i, 2]
        elif inizio_periodo <= data_movimento_attuale <= fine_periodo:
            giorni_periodo_attuale = (data_movimento_attuale - inizio_periodo_attuale).days

            saldi_parziali.append([inizio_periodo_attuale.date(),
                                   giorni_periodo_attuale,
                                   ultimo_saldo,
                                   giorni_periodo_attuale * ultimo_saldo])

            ultimo_saldo += movimenti.iloc[i, 1] - movimenti.iloc[i, 2]
            inizio_periodo_attuale = data_movimento_attuale

            if i == movimenti.shape[0]-1:
                giorni_periodo_attuale = (fine_periodo - data_movimento_attuale).days + 1
                saldi_parziali.append([inizio_periodo_attuale.date(),
                                       giorni_periodo_attuale,
                                       ultimo_saldo,
                                       ultimo_saldo * giorni_periodo_attuale])
        elif data_movimento_attuale > fine_periodo:
            giorni_periodo_attuale = (fine_periodo - movimenti.iloc[i-1, 0]).days + 1
            saldi_parziali.append([inizio_periodo_attuale.date(),
                                   giorni_periodo_attuale,
                                   ultimo_saldo,
                                   ultimo_saldo * giorni_periodo_attuale])
            break

    giacenza_periodo = sum(saldi_parziali[x][3] for x in range(0, len(saldi_parziali)))/giorni_periodo

    return ultimo_saldo, giacenza_periodo, saldi_parziali


def main():
    file = str(input("Inserisci il nome del file (con estensione): "))
    anno = input("Inserisci l'anno per il calcolo della giacenza media: ")
    saldo = input("Inserisci il saldo finale al 31 dicembre dell'anno precedente: ")

    file = os.getcwd() + file

    ultimo_saldo, giacenza_periodo, saldi_parziali = calcola_giacenza_media(carica_movimenti(file),
                                                                            year=anno,
                                                                            saldo_iniziale=saldo)

    print("Il saldo al 31 dicembre " + str((anno - 1)) + " è " + ultimo_saldo)
    print("La giacenza media per il " + anno + " è " + giacenza_periodo)


main()
