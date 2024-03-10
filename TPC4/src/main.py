import json

def cacl_periodos(compositores):
    periodos = set()
    for compositor in compositores:
        if 'periodo' in compositor:
            periodos.add(compositor['periodo'])
    return [{'id': f'P{i}', 'nome': periodo} for i, periodo in enumerate(periodos, start=1)]

with open('compositores.json', 'r') as json_file:
    db = json.load(json_file)

periodos = cacl_periodos(db['compositores'])
db['periodos'] = periodos

for compositor in db['compositores']:
    for periodo in db['periodos']:
        if 'periodo' in compositor:
            if compositor['periodo'] == periodo['nome']:
                compositor['id_periodo'] = periodo['id']
                break

with open('compositores.json', 'w') as json_file:
    json.dump(db, json_file, indent=4)
