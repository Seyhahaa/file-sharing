const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    address: { type: String },
    path: { type: String, required: true},
    organization: { type: String, required: true },
    position: { type: String,},
    role: {type: String, default: 'user'},
    dob: { type: Date },
    gender: { type: String},
    password: {type: String, required: true},

},{ timestamps: true });
const userModel = mongoose.model('Users', userSchema)

module.exports = userModel
