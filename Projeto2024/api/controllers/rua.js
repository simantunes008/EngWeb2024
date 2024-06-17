var Rua = require("../models/rua")

function compareStrings(a, b) {
    return a.localeCompare(b, undefined, { sensitivity: 'base', ignorePunctuation: true });
}

module.exports.list = () => {
    return Rua
        .find()
        .sort({ _id: 1 })
        .exec();
}

module.exports.listByNumero = () => {
    return Rua
        .find()
        .sort({ numero: 1 })
        .exec();
}

module.exports.listByNome = () => {
    return Rua
        .find()
        .exec()
        .then(data => data.sort((a, b) => compareStrings(a.nome, b.nome)));
}

module.exports.lookUp = id => {
    return Rua
        .findOne({ _id: id })
        .exec();
}

module.exports.insert = rua => {
    return Rua
        .create(rua);
}

module.exports.update = (id, comp) => {
    return Rua
        .updateOne({_id : id}, comp)
        .exec();
}
  
module.exports.remove = id => {
    return Rua
        .findByIdAndDelete({ _id: id })
        .exec();
}
