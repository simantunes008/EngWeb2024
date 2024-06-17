var User = require("../models/user")

module.exports.list = () => {
    return User
        .find()
        .exec();
}

module.exports.lookUp = id => {
    return User
        .findOne({ _id: id })
        .exec();
}

module.exports.insert = user => {
    return User
        .create(user);
}

module.exports.update = (id, comp) => {
    return User
        .updateOne({_id : id}, comp)
        .exec();
}
  
module.exports.remove = id => {
    return User
        .findByIdAndDelete({ _id: id })
        .exec();
}   
