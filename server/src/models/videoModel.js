const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    brand : String,
    product: String,
    variation: String,
    flag: Boolean,
    videoPath: String,
    createdAt : {type: Date, default: Date.now()}
})

const VideoSchema = new mongoose.Schema({
  video_id: Number,
  uploader: String,
  brandname: String,
  product: String,
  variation: String,
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
});


const VideoModel = mongoose.model("videos", VideoSchema);
module.exports = VideoModel;
