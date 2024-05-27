const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15002

app.post('/ficheiros', upload.fields([{ name: 'imagens', maxCount: 2 }, { name: 'textos', maxCount: 2 }]), function (req, res) {
    console.log("Informação sobre os ficheiros:")
    console.log(JSON.stringify(req.files))
    console.log("Informação sobre os campos textuais:")
    console.log(JSON.stringify(req.body))
    res.send("<p>OK!</p>")
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



