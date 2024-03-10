var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')       // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if(req.url == '/compositores'){
                    axios.get('http://localhost:3000/compositores?_sort=nome')
                    .then(resp => {
                        var compositores = resp.data
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(templates.compositoresListPage(compositores, d))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /compositores/id --------------------------------------------------------------------
                else if (/\/compositores\/C[0-9]+/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                    .then(resp => {
                        var compositor = resp.data
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(templates.compositorPage(compositor, d))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /compositores/periodo --------------------------------------------------------------------
                else if(/\/compositores\/P[0-9]+/.test(req.url)){
                    var idPeriodo = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores?id_periodo=' + idPeriodo + '&_sort=nome')
                    .then(resp => {
                        var compositores = resp.data
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(templates.compositoresListPage(compositores, d))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /compositores/registo --------------------------------------------------------------------
                else if (req.url == '/compositores/registo'){
                    axios.get('http://localhost:3000/periodos')
                    .then(resp => {
                        var periodos = resp.data
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(templates.compositorFormPage(d, periodos))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /compositores/edit/id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/' + idCompositor)
                    .then(resp => {
                        var compositor = resp.data
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(templates.compositorFormEditPage(compositor,d))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(521, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }
                
                // GET /compositores/delete/id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C[0-9]+/.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + idCompositor)
                    .then(resp => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(`<pre> ${JSON.stringify(resp.data)}<pre>`)
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(521, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /periodos --------------------------------------------------------------------
                else if(req.url == '/periodos'){
                    axios.get('http://localhost:3000/periodos')
                    .then(resp => {
                        var periodos = resp.data
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(templates.periodosListPage(periodos, d))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /periodos/id --------------------------------------------------------------------
                else if (/\/periodos\/P[0-9]+/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                    .then(resp => {
                        var periodo = resp.data
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(templates.periodoPage(periodo, d))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /periodos/registo --------------------------------------------------------------------
                else if (req.url == '/periodos/registo'){
                    res.writeHead(200, {'Content-Type': "text/html"})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }

                // GET /periodos/edit/id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/P[0-9]+/.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]
                    axios.get('http://localhost:3000/periodos/' + idPeriodo)
                    .then(resp => {
                        var periodo = resp.data
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(templates.periodoFormEditPage(periodo,d))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(521, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /periodos/delete/id --------------------------------------------------------------------
                else if (/\/periodos\/delete\/P[0-9]+/.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/periodos/' + idPeriodo)
                    .then(resp => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.write(`<pre> ${JSON.stringify(resp.data)}<pre>`)
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(521, {'Content-Type': "text/html"})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': "text/html"})
                    res.write(templates.errorPage(`Pedido Não Suportado: ${req.url}`, d))
                    res.end()
                }

                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                            .then(resp => {
                                var compositor = resp.data
                                res.writeHead(201, {'Content-Type': "text/html"})
                                res.write(templates.compositorPage(compositor, d))
                                res.end()
                            })
                            .catch( erro => {
                                res.writeHead(520, {'Content-Type': "text/html"})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })

                        } else {
                            res.writeHead(200, {'Content-Type': "text/html"})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }

                // POST /compositores/edit/id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/compositores/'+ idCompositor, result)
                            .then(resp => {
                                var compositor = resp.data
                                res.writeHead(201, {'Content-Type': "text/html"})
                                res.write(templates.compositorPage(compositor, d))
                                res.end()
                            })
                            .catch( erro => {
                                res.writeHead(520, {'Content-Type': "text/html"})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })

                        } else {
                            res.writeHead(200, {'Content-Type': "text/html"})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }

                // POST /periodos/registo --------------------------------------------------------------------
                else if(req.url == '/periodos/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/periodos', result)
                            .then(resp => {
                                var periodo = resp.data
                                res.writeHead(201, {'Content-Type': "text/html"})
                                res.write(templates.periodoPage(periodo, d))
                                res.end()
                            })
                            .catch( erro => {
                                res.writeHead(520, {'Content-Type': "text/html"})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })
                        
                        } else {
                            res.writeHead(200, {'Content-Type': "text/html"})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }

                // POST /periodos/edit/id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/P[0-9]+/.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/periodos/'+ idPeriodo, result)
                            .then(resp => {
                                var periodo = resp.data
                                res.writeHead(201, {'Content-Type': "text/html"})
                                res.write(templates.periodoPage(periodo, d))
                                res.end()
                            })
                            .catch( erro => {
                                res.writeHead(520, {'Content-Type': "text/html"})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })
                        
                        } else {
                            res.writeHead(200, {'Content-Type': "text/html"})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }

                // POST ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': "text/html"})
                    res.write(templates.errorPage(`Pedido Não Suportado: ${req.url}`, d))
                    res.end()
                }

                break
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(404, {'Content-Type': "text/html"})
                res.write(templates.errorPage(`Pedido Não Suportado: ${req.url}`, d))
                res.end()
        }
    }
})

alunosServer.listen(3040, ()=>{
    console.log("Servidor à escuta na porta 3040...")
})
