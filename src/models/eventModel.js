const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    address: {type: String, required: true},
    category: {type: String},
    startdate: {type: Date, required: true},
    enddate: {type: Date},
    description:{type: String, required:true},
    images: { type: String},
    key: {type: String},
    uploadBy: {type: mongoose.Types.ObjectId, ref: 'Users',required: true},
},{ timestamps: true });

eventSchema.plugin(mongoosePaginate);
eventSchema.index(
    {
        category: 'text',
        address: 'text',
        title: 'text'
    }
)

const eventModel = mongoose.model('Events', eventSchema)

module.exports = eventModel