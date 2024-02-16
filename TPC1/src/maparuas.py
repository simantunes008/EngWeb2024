import os
import xml.etree.ElementTree as ET

indice = '''
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Ruas de Braga</title>
    <meta charset="utf-8">
    <style>
        a {
            text-decoration: none;
            color: black;
        }
    </style>
</head>
<body>
    <h1>Ruas de Braga</h1>
    <ol>
'''

lista_ruas = []

for file in os.listdir('./texto'):
    file_path = os.path.join('./texto', file)
    with open(file_path, 'r', encoding='utf-8') as file:
        tree = ET.parse(file)
        root = tree.getroot()
    
    rua = root.find('.//nome').text.strip()
    numero = root.find('.//número').text.strip()
    lista_ruas.append((numero, rua))
    
    ficheiro_rua = open(f'html/{rua}.html', 'w')
    template_rua = f'''
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
        <title>{rua}</title>
        <meta charset="utf-8">
        <style>
            a {{
                text-decoration: none;
                color: black;
            }}
            img {{
                max-width: 80%; 
                height: auto;
                display: block; 
                margin: 0 auto; 
            }}
        </style>
    </head>
    <body>
    '''
    
    numero_vista = 1
    
    for imagem_atual in os.listdir('./atual'):
        if imagem_atual.startswith(f'{numero}-'):
            caminho = f'../atual/{imagem_atual}'
            legenda = f'{rua} atualmente - vista {numero_vista}'
            template_rua += f'<img src="{caminho}" alt="{legenda}">'
            template_rua += f'<p style="margin-top: 10px; text-align: center;">{legenda}</p>'
            numero_vista += 1
    
    for element in root.iter():
        if element.tag == 'lista-casas':
            break
        elif element.tag == 'para':
            paragrafo = ''.join(element.itertext())
            template_rua += f'<p>{paragrafo}</p>'
    
    for figura in root.findall('.//figura'):
        caminho = figura.find('imagem').attrib['path']
        legenda = figura.find('legenda').text
        template_rua += f'<img src="{caminho}" alt="{legenda}">'
        template_rua += f'<p style="margin-top: 10px; text-align: center;">{legenda}</p>'
    
    for lista_casas in root.findall('.//lista-casas'):
        template_rua += '<ul>'
        for casa in lista_casas.findall('./casa'):
            numero = casa.find('número').text
            enfiteuta = casa.find('enfiteuta').text if casa.find('enfiteuta') is not None else 'N/A'
            foro = casa.find('foro').text if casa.find('foro') is not None else 'N/A'
            descricao = ''.join(casa.find('desc').itertext()) if casa.find('desc') is not None else ''
            template_rua += f'''
            <li> 
                <p><b>Número: </b> {numero}</p>
                <p><b>Enfiteuta:</b> {enfiteuta}</p>
                <p><b>Foro:</b> {foro}</p>
                <p>{descricao}</p>
            </li>
            '''
        template_rua += '</ul>'
    
    template_rua += '''
    </body>
    <h6><a href="../maparuas.html">Voltar</h6>
    '''
    ficheiro_rua.write(template_rua)
    ficheiro_rua.close()

for numero, rua in sorted(lista_ruas, key=lambda x: int(x[0])):
    indice += f'<li><a href="html/{rua}.html">{rua}</a></li>'

indice += '''
    </ol>
</body>
</html>
'''

htmlfile = open('maparuas.html', 'w', encoding = 'utf-8')
htmlfile.write(indice)
htmlfile.close()
