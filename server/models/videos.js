 const mongoose = require("mongoose")

 const VideoSchema = new mongoose.Schema({
    video_id: Number,
    Uploader: String,
    Brand_Name:String,
    Product: String,
    variation:String,
    date: String,
    time:String,
    status: String,
    timeStamp: String,
    rule:String,
    details:String,
    recommendation:String,

 })

 const VideoModel = mongoose.model("videos", VideoSchema)
 module.exports = VideoModel