const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  // video_id: Number,
  category: String,
  uploader: String,
  brand: String,
  product: String,
  unit: String,
  size: Number,
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
  healthfact:String,
  message:[
    {
      text: String,
      user: String,
      messagetime:String,
      messagedate: String,
    }
  ],
  finalcomment:[
    {
      text: String,
      status:String,
      commenter: String,
      commentedtime:String,
      commenteddate: String,
    }
  ],

  finalflag: String,

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
      acceptance: [
        {
        user: String,
        decision: String,
        date:String,
        time:String
      }
      ],
      finalacceptance : [
        {
          user: String,
          decision: String,
          date:String,
          time:String
        }
      ]
    },
  ],

  reannotations: [
    {
      timestamp: String,
      rule: String,
      details: String,
      recommendation: String,

      finalacceptance : [
        {
          user: String,
          decision: String,
          date:String,
          time:String
        }
      ]
    },
  ],
});

const VideoModel = mongoose.model("videos", VideoSchema);
module.exports = VideoModel;
