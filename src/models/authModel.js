const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname:{type: String},
    username: {type: String, required: true, unique: true},  //concatenation of firstname and lastname for username
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, defaultValue: 'admin'},
    createdAt: {type: Date, default: Date.now},
})
const authModel = mongoose.model('auth', authSchema)

module.exports = authModel