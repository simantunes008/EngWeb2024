var express = require('express');
var router = express.Router();
var Pessoa = require("../controllers/pessoa")

router.get('/', function(req, res, next) {
  Pessoa.list()
    .then(data => res.jsonp(data))
    .catch(errp => res.jsonp(erro))
});

// router.post('/', function(req, res, next) {
  // Aluno.insert(req.body)
    // .then(data => res.jsonp(data))
    // .catch(errp => res.jsonp(erro))
// });
// 
// router.put('/:id', function(req, res, next) {
  // Aluno.update(req.params.id, req.body)
    // .then(data => res.jsonp(data))
    // .catch(errp => res.jsonp(erro))
// });
// 
// router.delete('/:id', function(req, res, next) {
  // Aluno.delete(req.params.id)
    // .then(console.log("Deleted " + req.params.id))
    // .catch(errp => res.jsonp(erro))
// });


module.exports = router;
