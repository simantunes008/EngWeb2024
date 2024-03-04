import json
import re

def read_json_file(file_path):
    bd = []
    try:
        with open(file_path, 'r') as json_file:
            for line in json_file:
                bd.append(json.loads(line))
    except FileNotFoundError:
        print(f"The file '{file_path}' could not be found")
    except Exception as e:
        print(f'An error occurred: {e}')
    return bd



def calc_atores(db):
    atores = {}
    counter = 1
    for reg in db:
        if "cast" in reg and len(reg["cast"]) > 0:
            for ator in reg["cast"]:
                ator = ator.strip()
                if ator not in atores and re.match(r'[A-Z].*', ator):
                    atores[ator] = f"a{counter}"
                    counter += 1
    return atores



def calc_generos(db):
    generos = {}
    counter = 1
    for reg in db:
        if "genres" in reg and len(reg["genres"]) > 0:
            for genero in reg["genres"]:
                genero = genero.strip()
                if genero not in generos:
                    generos[genero] = f"g{counter}"
                    counter += 1
    return generos



file_path = "filmes.json"
myBD = read_json_file(file_path)
atores = calc_atores(myBD)
generos = calc_generos(myBD)

for film in myBD:
    film["film_id"] = film["_id"]["$oid"]
    del(film["_id"])
    if "cast" in film:
        film["cast_ids"] = [atores[ator] for ator in film["cast"] if ator in atores]
    if "genres" in film:
        film["genres_ids"] = [generos[genero] for genero in film["genres"] if genero in generos]

novaDB = {
    "films": myBD,
    "actors": [
        {
            "id": id,
            "name": name
        } 
        for name, id in atores.items()],
    "genres": [
        {
            "id": id, 
            "type": type
        } 
        for type, id in generos.items()]
}

with open("filmesDB.json", "w") as file:
    json.dump(novaDB, file, indent=4)
