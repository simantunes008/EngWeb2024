var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const { v4: uuidv4 } = require('uuid');

var usersSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4},
    username: String,
    email: String,
    filiacao: String,
    nivel: { type: String, default: "consumidor" },
    dataRegisto: String,
    dataUltimoAcesso: String,
    password: String,
}, { versionKey: false });

usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", usersSchema);
