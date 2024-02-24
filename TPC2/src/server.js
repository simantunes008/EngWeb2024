var http = require('http');
var url = require('url');
var meta = require('./aux');

http.createServer((req, res) => {
    console.log(req.method + " " + req.url + " " + meta.myDateTime());

    var q = url.parse(req.url, true);

    if (q.pathname === "/") {
        meta.renderIndexPage(res);
    } else if (q.pathname === "/alunos") {
        meta.renderAlunosPage(res);
    } else if (q.pathname.startsWith("/alunos/")) {
        var alunoId = q.pathname.substring(8);
        meta.renderAlunoPage(res, alunoId);
    } else if (q.pathname === "/cursos") {
        meta.renderCursosPage(res);
    } else if (q.pathname.startsWith("/cursos/")) {
        var cursoId = q.pathname.substring(8);
        meta.renderCursoPage(res, cursoId);
    } else if (q.pathname === "/instrumentos") {
        meta.renderInstrumentosPage(res);
    } else if (q.pathname.startsWith("/instrumentos/")) {
        var instrumentoId = q.pathname.substring(14);
        meta.renderInstrumentoPage(res, instrumentoId);
    } else {
        meta.render404Page(res);
    }

}).listen(1902);

console.log("Servidor à escuta na porta 1902...");
