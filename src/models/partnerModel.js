const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    event: {type: mongoose.Types.ObjectId, ref: 'Events',required: true},
    logo: { type: String, required: true },
},{ timestamps: true });
const partnerModel = mongoose.model('Partners', partnerSchema)

module.exports = partnerModel