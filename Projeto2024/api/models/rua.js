var mongoose = require('mongoose');

var ruasSchema = new mongoose.Schema({
    _id: Number,
    numero: String,
    nome: String,
    descricao: String,
    figuras: [
        {
            id: String,
            caminho: String,
            legenda: String
        }
    ],
    casas: [
        {
            numero: String,
            enfiteuta: String,
            foro: String,
            desc: String
        }
    ]
}, { versionKey: false });

module.exports = mongoose.model("rua", ruasSchema);
