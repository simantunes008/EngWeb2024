import xml.etree.ElementTree as ET
import json
import os
import re

counter = 1

def parse_xml_to_dict(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    return parse_element(root)

def parse_element(element):
    parsed_element = {}
    
    global counter
    parsed_element['_id'] = counter
    counter += 1
    
    meta = element.find('meta')
    parsed_element['numero'] = meta.find('número').text.strip() if meta.find('número') is not None else ""
    parsed_element['nome'] = meta.find('nome').text.strip() if meta.find('nome') is not None else ""
    
    corpo = element.find('corpo')
    
    descricao = ""
    for para in corpo.findall('para'):
        if not para.findall('../lista-casas/casa'):
            paragrafo = "".join(para.itertext()).strip()
            paragrafo = re.sub(r'\s+', ' ', paragrafo)
            descricao += paragrafo + "\n"
    parsed_element['descricao'] = descricao.strip()
    
    lista_figuras = []
    for figura in corpo.findall('figura'):        
        figura_info = {
            'id': figura.get('id') if figura.get('id') is not None else "",
            'caminho': figura.find('imagem').get('path').replace('../imagem/', '/images/') if figura.find('imagem') is not None else "",
            'legenda': figura.find('legenda').text.strip() if figura.find('legenda') is not None else ""
        }
        lista_figuras.append(figura_info)
    
    current_images_folder = 'Mapa-Ruas-Braga/MapaRuas-materialBase/atual'
    for imagem_atual in os.listdir(current_images_folder):
        if imagem_atual.startswith(f"{parsed_element['numero']}-"):
            image_info = {
                'id': os.path.splitext(imagem_atual)[0],
                'caminho': os.path.join('/images/', imagem_atual),
                'legenda': re.sub(r'^\d+-', '', os.path.splitext(imagem_atual)[0])
            }
            lista_figuras.append(image_info)
    parsed_element['figuras'] = lista_figuras
    
    casas_element = corpo.find('lista-casas')
    
    lista_casas = []
    if casas_element is not None:
        for casa in casas_element.findall('casa'):
            casa_info = {
                'numero': str(casa.find('número').text).strip() if casa.find('número') is not None else "",
                'enfiteuta': str(casa.find('enfiteuta').text).strip() if casa.find('enfiteuta') is not None else "",
                'foro': str(casa.find('foro').text).strip() if casa.find('foro') is not None else "",
                'desc': re.sub(r'\s+', ' ', "".join(casa.find('desc').itertext()).strip()) if casa.find('desc') is not None else ""
            }
            lista_casas.append(casa_info)
    parsed_element['casas'] = lista_casas
    
    return parsed_element

def convert_xmls_to_json(xml_folder, output_json):
    json_data = []
    
    for file in os.listdir(xml_folder):
        if file.endswith(".xml"):
            xml_file = os.path.join(xml_folder, file)
            json_data.append(parse_xml_to_dict(xml_file))
    
    with open(output_json, "w", encoding='utf-8') as f:
        json.dump(json_data, f, indent=4, ensure_ascii=False)

xml_folder = "Mapa-Ruas-Braga/MapaRuas-materialBase/texto"
output_json = "ruas.json"

convert_xmls_to_json(xml_folder, output_json)
print("Success!")
