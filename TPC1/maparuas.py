import os
import xml.etree.ElementTree as ET

indice = """
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>MapaRuas</title>
    <meta charset="utf-8">
    <style>
        
    </style>
</head>
<body>
    <h1>MapaRuas</h1>
    <ul>
"""

litsaruas = []

for file in os.listdir("./MapaRuas-materialBase/texto"):
    file = open("./MapaRuas-materialBase/texto/" + file, "r", encoding="utf-8")
    tree = ET.parse(file)
    root = tree.getroot()
    file.close()
    
    rua = root[0][1].text.strip()
    litsaruas.append(rua)
    
    ficheiroRua = open(f"html/{rua}.html", "w")
    templateRua = f"""
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
        <title>{rua}</title>
        <meta charset="utf-8">
        <style>
            img {{
                max-width: 80%; 
                height: auto;
                display: block; 
                margin: 0 auto; 
            }}
        </style>
    </head>
    <body>
    """
    
    for element in root[1]:
        if (element.tag == "figura"):
            caminho = element.find("imagem").attrib["path"]
            legenda = element.find("legenda").text
            templateRua += f'<img src="../MapaRuas-materialBase/imagem/{caminho}" alt="{legenda}">'
            templateRua += f'<p style="margin-top: 10px; text-align: center;">{legenda}</p>'
        
        if (element.tag == "para"):
            paragrafo = ET.tostring(element, encoding='unicode', method='text').strip()
            templateRua += paragrafo
        
        if (element.tag == "lista-casas"):
            templateRua += "<ul>"
            for casa in root.findall("./corpo/lista-casas/casa"):
                numero_casa = casa.find("número").text
                enfiteuta_element = casa.find("enfiteuta")
                enfiteuta = enfiteuta_element.text if enfiteuta_element is not None else "N/A"
                foro_element = casa.find("foro")
                foro = foro_element.text if foro_element is not None else "N/A"
                descricao_element = casa.find("desc")
                descricao = ET.tostring(descricao_element, encoding='unicode', method='text').strip() if descricao_element is not None else ""
                templateRua += f"""
                <li> <b>Número: </b> {numero_casa}
                <p><b>Enfiteuta:</b> {enfiteuta}</p>
                <p><b>Foro:</b> {foro}</p>
                <p>{descricao}</p></li>
                """
            templateRua += "</ul>"
    
    templateRua += "</body>"
    templateRua += "<h6><a href=../maparuas.html>Voltar</h6>"
    ficheiroRua.write(templateRua)
    ficheiroRua.close()

for rua in sorted(litsaruas):
    indice += f'<li><a href="html/{rua}.html">{rua}</a></li>'

indice += """
    </ul>Cidade
</body>
</html>
"""

htmlfile = open("maparuas.html", "w", encoding = "utf-8")
htmlfile.write(indice)
htmlfile.close()
