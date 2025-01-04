const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname:{type: String},
    username: {type: String, required: true, unique: true},  //concatenation of firstname and lastname for username
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, default: 'viewer'},
    picture: {type: String},
    createdAt: {type: Date, default: Date.now},
})
const authModel = mongoose.model('Auth', authSchema)

module.exports = authModel