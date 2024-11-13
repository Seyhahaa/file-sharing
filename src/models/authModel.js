const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname:{type: String},
    username: {type: String, required: true, unique: true},  //concatenation of firstname and lastname for username
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, required: true, default: 'user'},
    createdAt: {type: Date, default: Date.now}
})
const userModel = mongoose.model('Users', userSchema)

module.exports = userModel