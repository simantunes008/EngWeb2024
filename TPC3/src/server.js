var http = require('http');
var url = require('url');
var pages = require('./pages');

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    var q = url.parse(req.url, true);

    if (q.pathname === "/") {
        pages.renderIndexPage(res);

    } else if (q.pathname === "/films") {
        pages.renderFilmsPage(res)
        
    } else if (q.pathname.match(/\/films\/.*/)) {
        let id = q.pathname.substring(7);
        pages.renderFilmPage(res, id);

    } else if (q.pathname === "/actors") {
        pages.renderActorsPage(res);

    } else if (q.pathname.match(/\/actors\/a[0-9]+/)) {
        let id = q.pathname.substring(8);
        pages.renderActorPage(res, id);

    } else if (q.pathname === "/genres") {
        pages.renderGenresPage(res);

    } else if (q.pathname.match(/\/genres\/g[0-9]+/)) {
        let id = q.pathname.substring(8);
        pages.renderGenrePage(res, id);

    } else {
        pages.render404Page(res);
        
    }

}).listen(2602);

console.log("Servidor à escuta na porta 2602...")
