const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15001

app.post('/ficheiros', upload.array('myFile'), function (req, res, next) {
    console.log("Informação sobre os ficheiros:")
    console.log(JSON.stringify(req.files))
    console.log("Informação sobre os campos textuais:")
    console.log(JSON.stringify(req.body))
    res.send("<p>OK!</p>")
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



