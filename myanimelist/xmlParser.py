import xml.etree.ElementTree as et

xml_file = open('/home/luca/Scaricati/animelist.xml', 'r')
tree = et.parse(xml_file)

tag = ('series_title', 'series_type', 'series_episodes', 'my_watched_episodes', 'my_status', 'my_score')
type = ('TV', 'ONA', 'OVA', 'Movie', 'Special')
status = ('Completed', 'Dropped', 'Plan to Watch', 'Watching', 'On-Hold')
status_text = ('### COMPLETATI', '### ABBANDONATI', '### DA VEDERE', '### IN CORSO', '### IN PAUSA')

# completed, dropped, planned, watching, hold
data = [[], [], [], [], []]

count = 0

for anime in tree.iterfind('anime'):
    count += 1
    element_tag = anime.find(tag[4]).text
    line = ""
    if element_tag in (status[1], status[3], status[4]) and anime.find(tag[1]).text in (type[0], type[1]):
        total_episodes = "/?"
        if anime.find(tag[2]).text != "0":
            total_episodes = "/" + anime.find(tag[2]).text

        line = anime.find(tag[0]).text + " " + anime.find(tag[3]).text + total_episodes
    else:
        line = anime.find(tag[0]).text

    data[status.index(element_tag)].append(line)


txt_file = open('/home/luca/Scaricati/Anime.txt', 'w')

for x in 3, 4, 2, 0, 1:
    txt_file.write("\n" + status_text[x] + "\n")
    for y in range(len(data[x])):
        txt_file.write(data[x][y] + "\n")

xml_file.close()
txt_file.close()

xml_file = open('/home/luca/Scaricati/mangalist.xml', 'r')
tree = et.parse(xml_file)

tag = ('manga_title', 'manga_volumes', 'manga_chapters', 'my_read_volumes', 'my_read_chapters', 'my_status')
status = ('Completed', 'Dropped', 'Plan to Read', 'Reading', 'On-Hold')
status_text = ('### COMPLETATI', '### ABBANDONATI', '### DA LEGGERE', '### IN CORSO', '### IN PAUSA')

# completed, dropped, planned, watching, hold
data = [[], [], [], [], []]

count = 0

for manga in tree.iterfind('manga'):
    count += 1
    element_tag = manga.find(tag[5]).text
    line = ""
    if element_tag in (status[1], status[3], status[4]):
        line = manga.find(tag[0]).text + " " + manga.find(tag[3]).text + "/" + manga.find(tag[1]).text
    else:
        line = manga.find(tag[0]).text

    data[status.index(element_tag)].append(line)

print(count)

txt_file = open('/home/luca/Scaricati/Manga.txt', 'w')

for x in 3, 4, 2, 0, 1:
    txt_file.write("\n" + status_text[x] + "\n")
    for y in range(len(data[x])):
        txt_file.write(data[x][y] + "\n")

xml_file.close()
txt_file.close()
