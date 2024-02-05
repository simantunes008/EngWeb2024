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

file = open("mapa.json", "r", encoding="utf-8").read()

result = json.loads(file)

html += "<ul>"

for elem in result ["cidades"]:
    html += f'<li>{elem ["nome"]}</li>'
    
html += "</ul>"

html += "</body>"

ficheiroHtml = open ("mapa.html", "w", encoding="utf-8")
ficheiroHtml.write(html)
ficheiroHtml.close()