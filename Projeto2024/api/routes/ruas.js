var express = require('express');
var router = express.Router();
var Rua = require("../controllers/rua");

/* GET /ruas */
router.get('/', function(req, res, next) {
    const sortBy = req.query._sort;
    
    if (sortBy === 'numero') {
        Rua.listByNumero()
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ error: err.message }));
    } else if (sortBy === 'nome') {
        Rua.listByNome()
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ error: err.message }));
    } else {
        Rua.list()
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ error: err.message }));
    }
});

/* GET /ruas/:id */
router.get('/:id', function(req, res, next) {
    Rua.lookUp(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});

/* POST /ruas */
router.post('/', function(req, res) {
    Rua.insert(req.body)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).json({ error: err.message }))
});
  
/* PUT /ruas/:id */
router.put('/:id', function (req, res) {
    Rua.update(req.params.id, req.body)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).json({ error: err.message }))
});

/* DELETE /ruas/:id */
router.delete('/:id', function(req, res) {
    return Rua.remove(req.params.id)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).json({ error: err.message }))
});

module.exports = router;
