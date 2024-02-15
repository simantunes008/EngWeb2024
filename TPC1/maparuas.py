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
    <ol>
"""

ruas_dict = {}

for file in os.listdir("./texto"):
    file_path = os.path.join("./texto", file)
    with open(file_path, "r", encoding="utf-8") as file:
        tree = ET.parse(file)
        root = tree.getroot()
    
    rua = root.find(".//nome").text.strip()
    numero = root.find(".//número").text.strip()
    ruas_dict[numero] = rua
    
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
    
    for element in root.iter():
        if element.tag == 'lista-casas':
            break
        elif element.tag == 'para':
            paragrafo = ''.join(element.itertext())
            templateRua += f'<p>{paragrafo}</p>'
    
    for element in root.findall('.//figura'):
        caminho = element.find("imagem").attrib["path"]
        legenda = element.find("legenda").text
        templateRua += f'<img src="{caminho}" alt="{legenda}">'
        templateRua += f'<p style="margin-top: 10px; text-align: center;">{legenda}</p>'
    
    for lista_casas in root.findall('.//lista-casas'):
        templateRua += "<ul>"
        for casa in lista_casas.findall("./casa"):
            numero_casa = casa.find("número").text
            enfiteuta_element = casa.find("enfiteuta")
            enfiteuta = enfiteuta_element.text if enfiteuta_element is not None else "N/A"
            foro_element = casa.find("foro")
            foro = foro_element.text if foro_element is not None else "N/A"
            descricao_element = casa.find("desc")
            descricao = ''.join(descricao_element.itertext()) if descricao_element is not None else ""
            templateRua += f"""
            <li> 
                <p><b>Número: </b> {numero_casa}</p>
                <p><b>Enfiteuta:</b> {enfiteuta}</p>
                <p><b>Foro:</b> {foro}</p>
                <p>{descricao}</p>
            </li>
            """
        templateRua += "</ul>"
    
    templateRua += "</body>"
    templateRua += "<h6><a href=../maparuas.html>Voltar</h6>"
    ficheiroRua.write(templateRua)
    ficheiroRua.close()

ruas_ordenadas = sorted(ruas_dict.items(), key=lambda x: int(x[0]))

for numero, rua in ruas_ordenadas:
    indice += f'<li><a href="html/{rua}.html">{rua}</a></li>'

indice += """
    </ol>
</body>
</html>
"""

htmlfile = open("maparuas.html", "w", encoding = "utf-8")
htmlfile.write(indice)
htmlfile.close()
