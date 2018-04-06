import xml.etree.ElementTree as et

xml_file = open('/home/luca/Scaricati/auto_backup_2017-10-13_00-05-00.mlx', 'r')
xml_tree = et.parse(xml_file)

tables_name = ('transactions', 'people', 'transaction_people', 'accounts', 'categories', 'campaigns',
               'campaign_transaction', 'currencies')

transactions = ('id', 'amount', 'display_date', 'cat_id', 'note', 'longtitude', 'latitude',
                'address', 'account_id', 'uuid')

people = ('id', 'name')

transaction_people = ('tran_id', 'person_id')

accounts = ('id', 'name', 'flag', 'cur_id')

categories = ('cat_id', 'cat_name', 'cat_type', 'account_id', 'parent_id')

campaigns = ('id', 'name', 'start_amount', 'goal_amount', 'type', 'status', 'cur_id', 'account_id', 'end_date')

campaign_transaction = ('trans_id', 'camp_id')

currencies = ('cur_id', 'cur_code', 'cur_name', 'cur_symbol')

tables = (transactions, people, transaction_people, accounts, categories, campaigns, campaign_transaction, currencies)

null = 'null'

root = xml_tree.getroot()

# 0: transactions
# 1: people
# 2: transaction_people
# 3: accounts
# 4: categories
# 5: campaigns
# 6: campaign_transaction
# 7: currencies
data = ([], [], [], [], [], [], [], [])

i = 0
for table in tables_name:
    for element in root.findall(".//row/..[@name='" + table + "']"):
        for row in element.findall("row"):
            rows = []
            for col in row.findall("col"):
                if col.get('name') in tables[i]:
                    rows.append(col.text)

            data[i].append(rows)
    i += 1

print(data)

for i in range(0, data[0].__len__()):
    for tran_id in data[0][i][3]:
        if tran_id in data[2][j][1]
