var express = require('express');
var router = express.Router();
var axios = require("axios");
var jsonfile = require('jsonfile')
var fs = require('fs')

var multer = require('multer')
var upload = multer({ dest: 'uploads' })

var jwt = require('jsonwebtoken');

function getDateTime() {
  // timezone de portugal
  var tzoffset = (-1) * 60 * 60 * 1000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().substring(0, 19)
  return localISOTime.replace('T', ' ')
}

function verificaAcesso(req, res, next) {
  if (req.cookies.token == undefined) {
    res.redirect('/login')
  }
  else {
    axios.post("http://authentication:3001/users/verificar", { token: req.cookies.token }).
      then(dados => {
        req.mytoken = dados.data
        next()
      }).catch(e => {
        token = jwt.decode(req.cookies.token)
        res.clearCookie('token')
        res.redirect('/login')
      })
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get('http://backend:3000/ruas?_sort=nome')
    .then(dados => {
      res.render('ruas', { lista: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro })
    });
});

/* GET /registo */
router.get('/registo', verificaAcesso, function (req, res, next) {
  axios.get('http://backend:3000/ruas')
    .then(dados => {
      res.render('form', { lista: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro })
    });
});

/* POST /registo */
router.post('/registo', verificaAcesso, upload.single('myFile'), (req, res) => {
  let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../public/images/' + req.file.originalname

  fs.rename(oldPath, newPath, function (error) {
    if (error) throw error
  })

  var date = new Date().toISOString().substring(0,19)
  var fileContent = jsonfile.readFileSync(__dirname + "/../data/dbFiles.json")
  var files = Array.isArray(fileContent) ? fileContent : [];
  files.push({
    date: date,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  })
  jsonfile.writeFileSync(__dirname + '/../data/dbFiles.json', files)

  var result = req.body

  result.figuras = [{ caminho: '/images/' + req.file.originalname, legenda: req.body['figuras[0][legenda]'] }];

  axios.post("http://backend:3000/ruas", result)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render("error", { "error": erro })
    })
});

/* GET /registar */
router.get('/registar', function (req, res) {
  res.render('signin');
});

/* POST /registar */
router.post('/registar', function (req, res) {
  axios.post('http://authentication:3001/users/registar', req.body)
    .then(response => {
      res.redirect('/login')
    })
    .catch(e => {
      res.render('error', { error: e })
    })
});

/* GET /login */
router.get('/login', function (req, res) {
  res.render('login');
});

/* POST /login */
router.post('/login', function (req, res) {
  axios.post('http://authentication:3001/users/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      res.redirect('/')
    })
    .catch(e => {
      res.render('error', { error: e, message: "Credenciais inválidas" })
    })
});

/* GET /editar */
router.get('/editar/:id', verificaAcesso, function(req, res, next) {
  axios.get(`http://backend:3000/ruas/${req.params.id}`)
    .then(dados => {
      res.render('edit', { rua: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro });
    });
});

/* POST /editar */
router.post('/editar/:id', verificaAcesso, upload.single('myFile'), function(req, res, next) {
  let updateData = req.body;

  if (req.file) {
    let oldPath = __dirname + '/../' + req.file.path;
    let newPath = __dirname + '/../public/images/' + req.file.originalname;

    fs.rename(oldPath, newPath, function(error) {
      if (error) throw error;
    });

    if (!updateData.figuras) updateData.figuras = [];
    updateData.figuras.push({ caminho: '/images/' + req.file.originalname, legenda: req.body['figuras[0][legenda]'] });
  }

  axios.put(`http://backend:3000/ruas/${req.params.id}`, updateData)
    .then(response => {
      res.redirect('/');
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

/* DELETE /:id */
router.post('/:id', verificaAcesso, function (req, res, next) {
  axios.delete(`http://backend:3000/ruas/${req.params.id}`)
      .then(response => {
          res.redirect('/');
      })
      .catch(error => {
          res.render('error', { error: error });
      });
});

/* GET /:id */
router.get('/:id', function (req, res, next) {
  axios.get('http://backend:3000/ruas/' + req.params.id)
    .then(dados => {
      res.render('rua', { rua: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

module.exports = router;
