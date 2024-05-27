var express = require('express');
var router = express.Router();
var axios = require("axios");


router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores?_sort=nome')
    .then(resp => {
      var compositores = resp.data
      res.status(200).render("compositoresListPage", {"lCompositores" : compositores, "date" : date})
    })
    .catch(erro => {
      res.status(501).render("error", {"error" : erro})
    })
});


router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos')
    .then(resp => {
        var periodos = resp.data
        res.status(200).render("compositorFormPage", {"lPeriodos" : periodos, "date" : date})
    })
    .catch(erro => {
      res.status(502).render("error", {"error" : erro})
    })
});


router.post('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var result = req.body
  axios.post("http://localhost:3000/compositores", result)
    .then(resp => {
      console.log(resp.data)
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(502).render("error", {"error" : erro})
    })
});


router.get('/:idCompositor', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.idCompositor)
    .then(resp => {
      var compositor = resp.data
      res.status(200).render("compositorPage", {"compositor" : compositor, "date" : date})
    })
    .catch(erro => {
      res.status(503).render("error", {"error" : erro})
    })
});


router.get('/edit/:idCompositor', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.all([
    axios.get('http://localhost:3000/compositores/' + req.params.idCompositor),
    axios.get('http://localhost:3000/periodos')
  ])
    .then(axios.spread((compositorResp, periodosResp) => {
      var compositor = compositorResp.data
      var periodos = periodosResp.data
      res.status(200).render("compositorFormEditPage", {"compositor" : compositor, "lPeriodos" : periodos, "date" : date})
    }))
    .catch(erro => {
      res.status(504).render("error", {"error" : erro})
    })
});


router.post('/edit/:idCompositor', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var compositor = req.body
  axios.put('http://localhost:3000/compositores/' + req.params.idCompositor, compositor)
    .then(resp => {
      res.status(200).redirect('/')
    })
    .catch(erro => {
      res.status(506).render("error", {"error" : erro})
    })
});


router.get('/delete/:idCompositor', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/compositores/' + req.params.idCompositor)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      res.status(505).render("error", {"error" : erro})
    })
});


module.exports = router;
