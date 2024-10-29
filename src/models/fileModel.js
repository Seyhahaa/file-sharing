const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: {type: String, required: true},
    status: {type: String, required: true, default: 'public'},
    size: { type: Number, required: true },
    path: { type: String, required: true },
    key: { type: String},
    mimetype: { type: String, required: true },
    uploadBy: {type: mongoose.Types.ObjectId, ref: 'Users',required: true},
    createdAt: {type: Date, default: Date.now}
})
const fileModel = mongoose.model('files', fileSchema)

module.exports = fileModel