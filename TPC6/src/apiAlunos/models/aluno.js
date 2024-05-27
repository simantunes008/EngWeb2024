var mongoose = require('mongoose')

var alunosSchema = new mongoose.Schema({
    _id : String,
    nome : String,
    gitlink: String,
    tp1 : Boolean,
    tp2 : Boolean,
    tp3 : Boolean,
    tp4 : Boolean,
    tp5 : Boolean,
    tp6 : Boolean,
    tp7 : Boolean,
    tp8 : Boolean,
    teste : Number,
    pratica : Number
}, {versionKe: false})

module.exports = mongoose.model("aluno", alunosSchema)