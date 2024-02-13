const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    video_id: Number,
    uploader: String,
    brand : String,
    product: String,
    variation: String,
    flag: Boolean,
    videoPath: String,
    createdAt : {type: Date, default: Date.now()},
    date: String,
    time: String,
    status: String,
    timestamp: String,
    rule: String,
    details: String,
    recommendation: String,
    annotatedtime:String,
    annotateddate:String,
    annotations: [
      {
        timestamp: String,
        rule: String,
        details: String,
        recommendation: String,
      },
    ],
})

const VideoModel = mongoose.model("videos", videoSchema);
module.exports = VideoModel;
