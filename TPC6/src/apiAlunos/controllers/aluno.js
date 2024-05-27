var mongoose = require('mongoose')
const { modelName} = require("../models/aluno")
var Aluno = require("../models/aluno")

module.exports.list = () => {   
    return Aluno
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.insert = (aluno) => {
    if ((Aluno.find({_id : aluno._id}).exec()).length != 1) {
        var newAluno = new Aluno(aluno)
        return newAluno.save()
    }
}

module.exports.delete = (id) => {
    return Aluno
        .find({_id : id})
        .deleteOne()
        .exec()
}

module.exports.update = (id, aluno) => {
    return Aluno
        .findByIdAndUpdate(id, aluno, {new : true})
        .exec()
}