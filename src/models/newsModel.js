const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subTitle: {type: String, required: true},
    content:{type: String, required:true},
    image: { type: String},
    uploadBy: {type: mongoose.Types.ObjectId, ref: 'Users',required: true},
},{ timestamps: true });
const newsModel = mongoose.model('news', newsSchema)

module.exports = newsModel