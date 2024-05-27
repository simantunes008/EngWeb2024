const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15000

app.post('/ficheiro', upload.single('myFile'), function (req, res, next) {
    console.log("Informação sobre o ficheiro:")
    console.log(JSON.stringify(req.file))
    console.log("Informação sobre os campos textuais:")
    console.log(JSON.stringify(req.body))
    res.send("<p>OK!</p>")
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



