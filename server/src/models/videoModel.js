const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  video_id: Number,
  uploader: String,
  brand: String,
  product: String,
  variation: String,
  flag: Boolean,
  videoPath: String,
  createdIn: String,
  createdAt : String,
  status: String,
  timestamp: String,
  rule: String,
  details: String,
  reviewedtime:String,
  revieweddate:String,
  expertreviewedtime:String,
  expertrevieweddate:String,
  recommendation: String,
  annotatedtime:String,
  annotateddate:String,
  comment:String,
  commentedtime:String,
  commenteddate: String,
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
