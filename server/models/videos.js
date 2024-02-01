 const mongoose = require("mongoose")

 const VideoSchema = new mongoose.Schema({
    video_id: Number,
    uploader: String,
    brandname:String,
    product: String,
    variation:String,
    date: String,
    time:String,
    status: String,
    timestamp: String,
    rule:String,
    details:String,
    recommendation:String,

 })

 const VideoModel = mongoose.model("videos", VideoSchema)
 module.exports = VideoModel