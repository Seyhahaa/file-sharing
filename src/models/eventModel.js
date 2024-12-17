const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    address: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
    description:{type: String, required:true},
    images: { type: String},
    key: {type: String},
    uploadBy: {type: mongoose.Types.ObjectId, ref: 'Users',required: true},
},{ timestamps: true });
const eventModel = mongoose.model('Events', eventSchema)

module.exports = eventModel