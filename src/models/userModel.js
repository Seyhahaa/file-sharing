const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, },
    address: { type: String, required: true },
    path: { type: String, default: "" },
    organization: { type: String,},
    position: { type: String,},
    dob: { type: Date },
    gender: { type: String, required: true },
    password: {type: String, required: true},
},{ timestamps: true });
const userModel = mongoose.model('Users', userSchema)

module.exports = userModel
