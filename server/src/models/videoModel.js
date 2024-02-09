const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    brand : String,
    product: String,
    variation: String,
    flag: Boolean,
    videoPath: String,
    createdAt : {type: Date, default: Date.now()}
})



module.exports = mongoose.model('Video' , videoSchema);