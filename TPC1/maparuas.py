import os
import xml.etree.ElementTree as ET

indice = """
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>MapaRuas</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>MapaRuas</h1>
    <ul>
"""

litsaruas = []

for filename in os.listdir("./MapaRuas-materialBase/texto"):
    filepath = os.path.join("./MapaRuas-materialBase/texto", filename)
    file = open(filepath, "r", encoding="utf-8")
    tree = ET.parse(file)
    root = tree.getroot()
    
    rua = root[0][1].text
    litsaruas.append(rua)
    
    ficheiroRua = open(f"html/{rua}.html", "w")
    templateRua = f"""
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
        <title>Rua</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>{rua}</h1>
    """
    
    for element in root[1]:
        if (element.tag == "figura"):
            img_path = element.find("imagem").attrib["path"]
            legenda = element.find("legenda").text
            templateRua += f'<img src="../MapaRuas-materialBase/imagem/{img_path}" alt="{legenda}" style="max-width: 50%;">'
            templateRua += f'<p>{legenda}</p>'
            
        if (element.tag == "para"):
            texto_paragrafo = ET.tostring(element, encoding='unicode', method='text').strip()
            templateRua += texto_paragrafo
        
        if (element.tag == "lista-casas"):
            templateRua += "<ul>"
            
            for casa in root.findall("./corpo/lista-casas/casa"):
                numero_casa = casa.find("número").text
                enfiteuta_element = casa.find("enfiteuta")
                enfiteuta = enfiteuta_element.text if enfiteuta_element is not None else "N/A"
                foro_element = casa.find("foro")
                foro = foro_element.text if foro_element is not None else "N/A"
                templateRua += f"<li>Casa {numero_casa}: Enfiteuta - {enfiteuta}, Foro - {foro}</li>"
            
            templateRua += "</ul>"
    
    templateRua += "</body>"
    templateRua += "<h6><a href=../maparuas.html>Voltar</h6>"
    ficheiroRua.write(templateRua)
    ficheiroRua.close()

for rua in sorted(litsaruas):
    indice += f'<li><a href="html/{rua}.html">{rua}</a></li>'

indice += """
    </ul>
</body>
</html>
"""

htmlfile = open("maparuas.html", "w", encoding = "utf-8")
htmlfile.write(indice)
htmlfile.close()
