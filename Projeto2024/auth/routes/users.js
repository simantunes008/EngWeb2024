var express = require('express')
var router = express.Router()
var User = require("../controllers/user")
var userModel = require("../models/user")
var passport = require('passport')
var jwt = require('jsonwebtoken')

function getDateTime() {
  // timezone de portugal
  var tzoffset = (-1) * 60 * 60 * 1000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().substring(0, 16)
  return localISOTime
}

function verificaAcesso(req, res, next) {
  var myToken = req.query.token || req.body.token
  if (myToken) {
    jwt.verify(myToken, "EngWeb2024", function (e, payload) {
      if (e) {
        console.log(e)
        res.status(401).jsonp({ error: e })
      }
      else {
        next()
      }
    })
  }
  else {
    res.status(401).jsonp({ error: "Token inexistente!" })
  }
}

/* GET /users */
router.get('/', verificaAcesso, function (req, res, next) {
  User.list()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* GET /users/:id */
router.get('/:id', verificaAcesso, function (req, res, next) {
  User.lookUp(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* POST /users */
router.post('/', verificaAcesso, function (req, res) {
  User.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).json({ error: err.message }))
});

/* POST /users/registar */
router.post('/registar', function (req, res) {
  var data = getDateTime()
  userModel.register(
    new userModel({
      _id: req.body._id,
      username: req.body.username,
      email: req.body.email,
      filiacao: req.body.filiacao,
      nivel: req.body.nivel,
      dataRegisto: data,
      dataUltimoAcesso: ""
    }),
    req.body.password,
    function (err, user) {
      if (err)
        res.status(520).jsonp({ error: err, message: "Register error: " + err })
      else
        res.status(201).jsonp('OK')
    })
})

/* POST /users/login */
router.post('/login', passport.authenticate('local'), function (req, res) {
  jwt.sign({
    username: req.user.username,
    nivel: req.user.nivel,
    sub: 'projeto de EngWeb2024'
  },
    "EngWeb2024",
    { expiresIn: 3600 },
    function (e, token) {
      if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
      else res.status(201).jsonp({ token: token })
    });
})

/* POST /users/verificar */
router.post('/verificar', function (req, res) {
  jwt.verify(req.body.token, "EngWeb2024", function (e, payload) {
    if (e) {
      res.status(401).jsonp({ error: e })
    }
    else {
      res.status(200).jsonp(payload)
    }
  })
})

/* PUT /users/:id */
router.put('/:id', verificaAcesso, function (req, res) {
  User.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).json({ error: err.message }))
});

/* DELETE /users/:id */
router.delete('/:id', verificaAcesso, function (req, res) {
  return User.remove(req.params.id)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).json({ error: err.message }))
});

module.exports = router;
