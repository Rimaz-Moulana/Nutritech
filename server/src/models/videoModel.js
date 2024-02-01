const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    brand : {type: String},
    description: String,
    flag: Boolean,
    url: String,
    createdAt: {type: Date, default: Date.now}
})

// videoSchema.plugin(autoIncrement.plugin, {
//     model: 'Video',
//     field: '_id',
//     startAt: 1,
//     incrementBy: 1
// });


module.exports = mongoose.model('Video' , videoSchema);