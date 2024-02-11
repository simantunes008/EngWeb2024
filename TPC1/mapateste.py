import json

html = """
<!DOCTYPE html>
<html lang "en-US">
<head>
    <title> Mapa</title>
    <meta charset="utf-8">
</head>
<body>
"""

template = """
<!DOCTYPE html>
<html lang "en-US">
<head>
    <title> Mapa</title>
    <meta charset="utf-8">
</head>
<body>
"""

file = open("mapa.json", "r", encoding="utf-8").read()

result = json.loads(file)

html += "<ul>"  

listadeCidades = []
for elem in result ["cidades"]:
    listadeCidades.append(elem["nome"])
    ficheiroCidade = open(f"html/{elem['nome']}.html", "w")
    templateCidade = template
    templateCidade += f"<h1>{elem['nome']}</h1>"
    templateCidade += f"<h2>{elem['distrito']}</h1>"
    templateCidade += f"<b>População: </b>{elem['população']}"
    templateCidade += f"<br>"
    templateCidade += f"<b>Descrição: </b>{elem['descrição']}"
    templateCidade += "</body>"
    templateCidade += '<h6><a href="../mapa_sorted_link.html">Voltar </h6>'
    ficheiroCidade.write(templateCidade)
    ficheiroCidade.close()
    
html += "</ul>"

for elem in sorted (listadeCidades):
    html += f'<li><a href="html/{elem}.html">{elem}</a></li>'

html += "</ul>"
html += "</body>"

ficheiroHtml = open ("mapa_sorted_link.html", "w", encoding="utf-8")
ficheiroHtml.write(html)
ficheiroHtml.close()
