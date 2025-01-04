const { default: mongoose } = require("mongoose");

const cmtSchema = new mongoose.Schema({
    content: { type: String, required: true },
    event: { type: mongoose.Types.ObjectId, ref: 'Events', required: true },
    byUser: { type: mongoose.Types.ObjectId, ref: 'Auth', required: true },
},{timestamps: true})
const commentModel = mongoose.model('Comments', cmtSchema)

module.exports = commentModel