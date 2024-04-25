const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  video_id: Number,
  category: String,
  uploader: String,
  brand: String,
  product: String,
  variation: String,
  flag: Boolean,
  videoPath: String,
  duration: Number,
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
  finalcomment:[
    {
      text: String,
      commenter: String,
      status: String,
      commentedtime:String,
      commenteddate: String,
    }
  ],

  finalflag:[
    {
      status:String,
      email:String,
      expertreviewedtime:String,
      expertrevieweddate:String,
    }
  ],

  panelstatus:[
    {
      status:String,
      email:String,
      expertreviewedtime:String,
      expertrevieweddate:String,
    }
  ],

  comment:[
    {
      text: String,
      commenter: String,
      status: String,
      commentedtime:String,
      commenteddate: String,

    }
  ],

  reply:[
    {
      text: String,
      replyer: String,
      status: String,
      repliedtime:String,
      replieddate: String,

    }
  ],
  
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
