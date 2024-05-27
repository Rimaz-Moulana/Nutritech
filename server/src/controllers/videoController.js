
// const videoService = require('../services/videoService');
const Video = require('../models/videoModel')
const { convertVideoToText } = require('../services/videoService');

const VideoService = require('../services/videoService')

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await VideoService.getAnnotatorAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAnnotatedVideos = async (req, res) => {
    try {
      const videos = await VideoService.getAnnotatorAnnotatedVideos();
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.getAnnotatedVideosForExperts= async (req, res) => {
    try {
      const videos = await VideoService.getAnnotatedVideosForExpert();
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.getReannotateVideos = async (req, res) => {
    try {
      const videos = await VideoService.getAnnotatorReannotateVideos();
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.getUnannotatedVideos = async (req, res) => {
    try {
      const videos = await VideoService.getAnnotatorUnannotatedVideos();
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getAnnotatingVideo = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const video = await VideoService.getAnnotationVideo(videoId);
      res.status(200).json(video);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  exports.postVideoDetails= async (req,res)=>{
    try {
          const ITNVideos = await VideoService.postmediavideodetails(req);
          res.json(ITNVideos);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }

exports.getuploadhistory= async (req,res)=>{
  try {
        const ITNVideos = await VideoService.getmediahistory();
        res.json(ITNVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.addvideo = async (req, res) => {
  try {
    // console.log(req.body);
      const { brand, product, unit,size, category, createdIn, createdAt, duration } = req.body;
      const videoPath = req.file.path;

      console.log(duration);
      // Convert uploaded video to text
      // const text = await convertVideoToText(videoPath);
      // console.log('hi'+text)

      // Create a new video object
      const newVideo = new Video({
          brand,
          product,
          unit,
          size,
          category,
          videoPath,
          createdIn,
          createdAt,
          duration,
          status: 'pending',
          uploader: 'Sirasa'
      });

      // Save the new video
      await newVideo.save();

      // Send response with converted text
      res.status(201).json({ success: true, newVideo });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getpendingvideos= async (req,res)=>{
  try {
        const pendingVideos = await VideoService.getsensormanagernewvideos();
        res.json(pendingVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getsensormanagernallvideos= async (req,res)=>{
  try {
        const pendingVideos = await VideoService.getsensormanagerallvideo();
        res.json(pendingVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateDecision= async (req,res)=>{
  
  try {
        const video = await VideoService.updateDecisionForUser(req);
        res.json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




exports.saveSensorManagerReview= async (req,res)=>{
  try {
        const videoId = req.params.videoId;
        const videoStatus = await VideoService.saveSensorManagerReviewStatus(videoId);
        res.json(videoStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.fetchSensorManagerReview = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await VideoService.getSensorManagerReviewVideos(videoId);
    // console.log(video)
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    res.json({ success: true, video });
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ success: false, message: 'Error fetching annotations' });
  }
};


exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    await VideoService.deleteVideo(videoId);

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSimilarAds = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const videos = await VideoService.getSimilarProductAds(videoId);
    // console.log("videos"+videos)
    res.json(videos);
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllUploadedVideos= async (req,res)=>{
  try {
        const Videos = await VideoService.getAll();
        res.json(Videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getPendingUploadedVideos= async (req,res)=>{
  try {
        const Videos = await VideoService.getPending();
        res.json(Videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getUnannotatedUploadedVideos= async (req,res)=>{
  try {
        const Videos = await VideoService.getUnannotated();
        res.json(Videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAnnotatedUploadedVideos= async (req,res)=>{
  try {
        const Videos = await VideoService.getAnnotated();
        res.json(Videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getGreenUploadedVideos= async (req,res)=>{
  try {
        const Videos = await VideoService.getGreen();
        res.json(Videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getRedUploadedVideos= async (req,res)=>{
  try {
        const Videos = await VideoService.getRed();
        res.json(Videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateExpertFlagReview = async (req,res)=>{
  try {
    const videoId = req.params.videoId;
    const panelstatus = req.body.panelstatus;
    console.log(panelstatus);
    
        const Video = await VideoService.updateReview(videoId,panelstatus);
        // console.log(Video)
        res.json(Video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.AllRedFlagVideos = async (req, res) => {
  
  try {
    const videos = await VideoService.getAllRedFlagVideos();
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.AllGreenFlagVideos = async (req, res) => {
  try {
    const videos = await VideoService.getAllGreenFlagVideos();
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.postExpertComment= async (req,res)=>{
  try {
    const videoId = req.params.videoId;
    const comments = req.body.comment;
    const email = req.body.email;
        const comment = await VideoService.postComment(videoId,comments,email);
        // console.log(comment)
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



exports.postFinalComment= async (req,res)=>{
  try {
    const videoId = req.params.videoId;
    const comments = req.body.comment;
    const email = req.body.email;
        const comment = await VideoService.postFinal(videoId,comments,email);
        console.log(comment)
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.postExpertMessage= async (req,res)=>{
  try {
    const videoId = req.params.videoId;
    const comments = req.body.comment;
    const email = req.body.email;
        const comment = await VideoService.postMessage(videoId,comments,email);
        console.log(comment);
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateExpertHeadFlagReview = async (req,res)=>{
  try {
    const videoId = req.params.videoId;
    const finalflag = req.body.finalflag;
    // console.log(finalflag);
    
        const Video = await VideoService.updateFinalReview(videoId,finalflag);
        // console.log(Video)
        res.json(Video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



exports.postIndustryReply= async (req,res)=>{
  try {
    const videoId = req.params.videoId;
    // console.log(videoId)
    const reply = req.body.comment;
    const email = req.body.email;
        const replycomment = await VideoService.postReply(videoId,reply,email);
        // console.log(comment)
        res.json(replycomment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
