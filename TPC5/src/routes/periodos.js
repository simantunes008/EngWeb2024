var express = require('express');
var router = express.Router();
var axios = require("axios");


router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/periodos')
    .then(resp => {
      var periodos = resp.data;
      res.status(200).render("periodosListPage", {"lPeriodos" : periodos, "date" : date});
    })
    .catch(erro => {
      res.status(507).render("error", {"error" : erro});
    });
});


router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  res.status(200).render("periodoFormPage", {"date" : date})
});
  
  
router.post('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var result = req.body
  axios.post("http://localhost:3000/periodos", result)
    .then(resp => {
      console.log(resp.data)
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(508).render("error", {"error" : erro})
    })
});


router.get('/:idPeriodo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/periodos/' + req.params.idPeriodo)
    .then(resp => {
      var periodo = resp.data;
      res.status(200).render("periodoPage", {"periodo" : periodo, "date" : date});
    })
    .catch(erro => {
      res.status(509).render("error", {"error" : erro});
    });
});


router.get('/edit/:idPeriodo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/periodos/' + req.params.idPeriodo)
    .then(resp => {
      var periodo = resp.data;
      res.status(200).render("periodoFormEditPage", {"periodo" : periodo, "date" : date});
    })
    .catch(erro => {
      res.status(510).render("error", {"error" : erro});
    });
});


router.post('/edit/:idPeriodo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  var periodo = req.body;
  axios.put('http://localhost:3000/periodos/' + req.params.idPeriodo, periodo)
    .then(resp => {
      res.status(200).redirect('/');
    })
    .catch(erro => {
      res.status(511).render("error", {"error" : erro});
    });
});


router.get('/delete/:idPeriodo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/periodos/' + req.params.idPeriodo)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      res.status(512).render("error", {"error" : erro})
    })
});


module.exports = router;
