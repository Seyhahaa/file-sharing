const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subTitle: {type: String},
    content:{type: String, required:true},
    image: { type: String},
    socialMedia: {type: Array },
    key: {type: String},
    uploadBy: {type: mongoose.Types.ObjectId, ref: 'Users',required: true},
},{ timestamps: true });
newsSchema.plugin(mongoosePaginate);
newsSchema.index(
    {
        title: 'text'
    }
)
const newsModel = mongoose.model('news', newsSchema)

module.exports = newsModel