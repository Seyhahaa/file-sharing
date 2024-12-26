const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
    event: {type: mongoose.Types.ObjectId, ref: 'Events',required: true},
    photo: { type: String, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true},
    position: { type: String, required: true },

},{ timestamps: true });
const speakerModel = mongoose.model('Speakers', speakerSchema)

module.exports = speakerModel