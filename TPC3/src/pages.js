var axios = require('axios');

exports.renderIndexPage = (res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write("<title>MovieHub</title>");
    res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
    res.write("<body>");
    res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
    res.write("<div class='w3-container'>");
    res.write("<ul>");
    res.write("<li><a href='/films' style='text-decoration: none;'>Filmes</a></li>");
    res.write("<li><a href='/actors' style='text-decoration: none;'>Atores</a></li>");
    res.write("<li><a href='/genres' style='text-decoration: none;'>Géneros</a></li>");
    res.write("</ul>");
    res.write("</div>");
    res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
    res.write("</body>");
    res.end();
}

exports.renderFilmsPage = (res) => {
    axios.get("http://localhost:3000/films?_sort=year,title")
    .then(resp => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<title>MovieHub - Filmes</title>");
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<body>");
        res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
        res.write("<div class='w3-container'>");
        res.write("<p>Lista de vários filmes lançados entre 1900 e 2020 por ordem temporal e alfabética.</p>");
        res.write("<table class='w3-table w3-bordered w3-striped'>");
        res.write("<tr class='w3-blue'>");
        res.write("<th>Título</th>");
        res.write("<th>Ano de lançamento</th>");
        res.write("</tr>");
        resp.data.forEach(item => {
            res.write("<tr>");
            res.write("<td><a href='/films/" + item.film_id + "' style='text-decoration: none;'>" + item.title + "</a></td>");
            res.write("<td>" + item.year + "</td>");
            res.write("</tr>");
        });
        res.write("</table>");
        res.write("</div>");
        res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
        res.write("</body>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderFilmPage = (res, id) => {
    axios.get(`http://localhost:3000/films?film_id=${id}`)
    .then(resp => {
        var filme = resp.data;
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<title>MovieHub - " + filme[0]["title"] + "</title>");
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<body>");
        res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
        res.write("<div class='w3-container'>");
        res.write("<p> <b> ID: </b>" + filme[0]["film_id"] + "</p>");
        res.write("<p> <b> Título: </b>" + filme[0]["title"] + "</p>");
        res.write("<p> <b> Ano de lançamento: </b>" + filme[0]["year"] + "</p>");
        res.write("<p> <b> Elenco: </b> </p>");
        res.write("<ul>");
        for (let i = 0; i < filme[0]["cast"].length; i++) {
            const ator = filme[0]["cast"][i];
            const ator_id = filme[0]["cast_ids"][i];
            res.write("<li><a href='/actors/" + ator_id + "' style='text-decoration: none;'>" + ator + "</a></li>");
        }
        res.write("</ul>");
        res.write("<p> <b> Géneros: </b> </p>");
        res.write("<ul>");
        for (let i = 0; i < filme[0]["genres"].length; i++) {
            const genero = filme[0]["genres"][i];
            const genero_id = filme[0]["genres_ids"][i];
            res.write("<li><a href='/genres/" + genero_id + "' style='text-decoration: none;'>" + genero + "</a></li>");
        }
        res.write("</ul>");
        res.write("</div>");
        res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
        res.write("</body>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderActorsPage = (res) => {
    axios.get("http://localhost:3000/actors?_sort=name")
    .then(resp => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<title>MovieHub - Atores</title>");
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<body>");
        res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
        res.write("<div class='w3-container'>");
        res.write("<p></p>");
        res.write("<table class='w3-table w3-bordered w3-striped'>");
        res.write("<tr class='w3-blue'>");
        res.write("<th>Nome</th>");
        res.write("</tr>");
        resp.data.forEach(item => {
            res.write("<tr>");
            res.write("<td><a href='/actors/" + item.id + "' style='text-decoration: none;'>" + item.name + "</a></td>");
            res.write("</tr>");
        });
        res.write("</table>");
        res.write("</div>");
        res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
        res.write("</body>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderActorPage = (res, id) => {
    axios.get(`http://localhost:3000/actors?id=${id}`)
    .then(resp => {
        var ator = resp.data;
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<title>MovieHub - " + ator[0]["name"] + "</title>");
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<body>");
        res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
        res.write("<div class='w3-container'>");
        res.write("<p> <b> ID: </b>" + ator[0]["id"] + "</p>");
        res.write("<p> <b> Nome: </b>" + ator[0]["name"] + "</p>");
        res.write("</div>");
        res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
        res.write("</body>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderGenresPage = (res) => {
    axios.get("http://localhost:3000/genres?_sort=type")
    .then(resp => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<title>MovieHub - Géneros</title>");
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<body>");
        res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
        res.write("<div class='w3-container'>");
        res.write("<p></p>");
        res.write("<table class='w3-table w3-bordered w3-striped'>");
        res.write("<tr class='w3-blue'>");
        res.write("<th>Tipo</th>");
        res.write("</tr>");
        resp.data.forEach(item => {
            res.write("<tr>");
            res.write("<td><a href='/genres/" + item.id + "' style='text-decoration: none;'>" + item.type + "</a></td>");
            res.write("</tr>");
        });
        res.write("</table>");
        res.write("</div>");
        res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
        res.write("</body>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderGenrePage = (res, id) => {
    axios.get(`http://localhost:3000/genreScott Mechlowicz
    Scott Menvilles?id=${id}`)
    .then(resp => {
        var genero = resp.data;
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<title>MovieHub - " + genero[0]["type"] + "</title>");
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<body>");
        res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
        res.write("<div class='w3-container'>");
        res.write("<p> <b> ID: </b>" + genero[0]["id"] + "</p>");
        res.write("<p> <b> Tipo: </b>" + genero[0]["type"] + "</p>");
        res.write("</div>");
        res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
        res.write("</body>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.render404Page = (res) => {
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf8'});
    res.write("<title>MovieHub</title>");
    res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
    res.write("<body>");
    res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
    res.write("<div class='w3-container'>");
    res.write("404 Página não encontrada");
    res.write("</div>");
    res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
    res.write("</body>");
    res.end();
}

exports.renderInternalServerError = (res) => {
    res.writeHead(500, {'Content-Type': 'text/html; charset=utf8'});
    res.write("<title>MovieHub</title>");
    res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
    res.write("<body>");
    res.write("<header class='w3-container w3-blue'><h1><a href='/' style='text-decoration: none;'>MovieHub</a></h1></header>");
    res.write("<div class='w3-container'>");
    res.write("Erro interno do servidor");
    res.write("</div>");
    res.write("<footer class='w3-container w3-blue'><h5>EngWeb2024</h5><p>UC de 3º Ano de Engenharia Informática da Universidade do Minho.</p></footer>");
    res.write("</body>");
    res.end();
}
    