Servidor

GET 
    / -> página principal
    /fileContent/:fname => Conteúdo do ficheiro
    /download/:fname => ficheiro p/ download
POST
    /files => recebe um ficheiro p/ guardar
        persistência: data7db.json