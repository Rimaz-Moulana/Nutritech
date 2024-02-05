const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Craete Schema and Model

const VideoSchema = new Schema({
    
video_id: Number,
Uploader: String,
Brand_Name:String,
Product: String,
variation:String,
date: String,
time:String,
status: String,

});

const Video = mongoose.model('Video',VideoSchema);

module.exports = Video;