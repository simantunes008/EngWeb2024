import os
import xml.etree.ElementTree as ET

html = """
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>MapaRuas</title>
    <meta charset="utf-8">
</head>
<body>
"""

template = """
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title> Mapa</title>
    <meta charset="utf-8">
</head>
<body>
"""

path_to_xml = '../../MapaRuas-materialBase/texto'

html += "<ul>"

listaruas = []
for file_name in os.listdir(path_to_xml):
    complete_file_path = path_to_xml + '/' + file_name
    tree = ET.parse(complete_file_path)
    root = tree.getroot()
    rua = root.find('.//nome').text
    listaruas.append(rua)
    htmlfile = open(f"html/{rua}.html", "w")
    templaterua = template
    templaterua += f"<h1> {rua} </h1>" 
    templaterua += "</body>"
    templaterua += '<h6> <a href="../maparuas.html"> Voltar </a> </h6>'
    htmlfile.write(templaterua)

for rua in sorted(listaruas):
    html += f'<li> <a href="html/{rua}.html"> {rua} </a> </li>'

html += "</ul>"
html += "</body>"
html += "</html>"

htmlfile = open("maparuas.html", "w", encoding = "utf-8")
htmlfile.write(html)
htmlfile.close()
