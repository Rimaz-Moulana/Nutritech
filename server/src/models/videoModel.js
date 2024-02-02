const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    brand : {type: String},
    description: String,
    flag: Boolean,
    url: String,
    createdAt : {type: Date, default: Date.now()}
})



module.exports = mongoose.model('Video' , videoSchema);