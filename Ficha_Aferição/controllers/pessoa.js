var mongoose = require('mongoose')
const { modelName} = require("../model/pessoa")
var Pessoa = require("../model/pessoa")

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome:1})
        .exec()
}

// module.exports.insert = (aluno) => {
    // if ((Pessoa.find({_id : aluno._id}).exec()).length != 1) {
        // var newAluno = new Pessoa(aluno)
        // return newAluno.save()
    // }
// }
// 
// module.exports.delete = (id) => {
    // return Pessoa
        // .find({_id : id})
        // .deleteOne()
        // .exec()
// }
// 
// module.exports.update = (id, aluno) => {
    // return Pessoa
        // .findByIdAndUpdate(id, aluno, {new : true})
        // .exec()
// }