var axios = require('axios');

exports.myDateTime = () => {
    var d = new Date().toISOString().substring(0, 16);
    return d;
}

exports.renderIndexPage = (res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
    res.write("<header class='w3-container w3-teal'><h1>Índice</h1></header>");
    res.write("<ul>");
    res.write("<li><a href='/alunos'>Alunos</a></li>");
    res.write("<li><a href='/cursos'>Cursos</a></li>");
    res.write("<li><a href='/instrumentos'>Instrumentos</a></li>");
    res.write("</ul>");
    res.end();
}

exports.renderAlunosPage = (res) => {
    axios.get("http://localhost:3000/alunos?_sort=nome")
    .then(resp => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<header class='w3-container w3-teal'><h1>Lista de Alunos</h1></header>");
        res.write("<ul>");
        resp.data.forEach(item => {
            res.write("<li><a href='/alunos/" + item.id + "'>" + item.nome.toLowerCase() + "</a></li>");
        });
        res.write("</ul>");
        res.write("<a href='/'>Voltar</a>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderAlunoPage = (res, alunoId) => {
    axios.get(`http://localhost:3000/alunos/${alunoId}`)
    .then(resp => {
        var aluno = resp.data;
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<header class='w3-container w3-teal'><h1>Dados do Aluno</h1></header>");
        res.write("<p>ID: " + aluno.id + "</p>");
        res.write("<p>Nome: " + aluno.nome + "</p>");
        res.write("<p>Data de nascimento: " + aluno.dataNasc + "</p>");
        res.write("<p>Curso: " + aluno.curso + "</p>");
        res.write("<p>Ano do curso: " + aluno.anoCurso + "</p>");
        res.write("<p>Instrumento: " + aluno.instrumento + "</p>");
        res.write("<a href='/alunos'>Voltar</a>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderCursosPage = (res) => {
    axios.get("http://localhost:3000/cursos?_sort=designacao")
    .then(resp => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<header class='w3-container w3-teal'><h1>Lista de Cursos</h1></header>");
        res.write("<ul>");
        resp.data.forEach(item => {
            res.write("<li><a href='/cursos/" + item.id + "'>" + item.designacao.toLowerCase() + "</a></li>");
        });
        res.write("</ul>");
        res.write("<a href='/'>Voltar</a>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderCursoPage = (res, cursoId) => {
    axios.get(`http://localhost:3000/cursos/${cursoId}`)
    .then(resp => {
        var curso = resp.data;
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<header class='w3-container w3-teal'><h1>Dados do Curso</h1></header>");
        res.write("<p>ID: " + curso.id + "</p>");
        res.write("<p>Designação: " + curso.designacao + "</p>");
        res.write("<p>Duração: " + curso.duracao + "</p>");
        res.write("Instrumento: " + curso.instrumento.id + "</p>")
        res.write("<a href='/cursos'>Voltar</a>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderInstrumentosPage = (res) => {
    axios.get("http://localhost:3000/instrumentos?_sort=text")
    .then(resp => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<header class='w3-container w3-teal'><h1>Lista de Instrumentos</h1></header>");
        res.write("<ul>");
        resp.data.forEach(item => {
            res.write("<li><a href='/instrumentos/" + item.id + "'>" + item["#text"].toLowerCase() + "</a></li>");
        });
        res.write("</ul>");
        res.write("<a href='/'>Voltar</a>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.renderInstrumentoPage = (res, instrumentoId) => {
    axios.get(`http://localhost:3000/instrumentos/${instrumentoId}`)
    .then(resp => {
        var instrumento = resp.data;
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<header class='w3-container w3-teal'><h1>Dados do Instrumento</h1></header>");
        res.write("<p>ID: " + instrumento.id + "</p>");
        res.write("<p>Nome: " + instrumento["#text"] + "</p>");
        res.write("<a href='/instrumentos'>Voltar</a>");
        res.end();
    })
    .catch(error => {
        console.error("Erro: " + error);
        exports.renderInternalServerError(res);
    });
}

exports.render404Page = (res) => {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf8'});
    res.write("Página não encontrada");
    res.end();
}

exports.renderInternalServerError = (res) => {
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf8'});
    res.write("Erro interno do servidor");
    res.end();
}
