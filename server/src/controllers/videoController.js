
// const videoService = require('../services/videoService');
const Video = require('../models/videoModel')

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


exports.addvideo = async (req,res) => {

    try{
        const { brand, product , variation , createdIn, createdAt,duration} = req.body;
        const videoPath = req.file.path
        // console.log(req.body)
        const newVideo = new Video({brand,product,variation, videoPath, createdIn, createdAt, duration, status: 'pending', uploader:'Sirasa'});
        console.log(newVideo)
        await newVideo.save();
       
        return res.status(201).json({success: true, newVideo});

    } catch(error){
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error'});
    }
}

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


exports.updateExpertReviewtored= async (req,res)=>{
  try {
    const videoId = req.params.videoId;
        const Video = await VideoService.updateReviewRed(videoId);
        // console.log(Video)
        res.json(Video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateExpertReviewtogreen= async (req,res)=>{
  try {
    const videoId = req.params.videoId;
        const Video = await VideoService.updateReviewGreen(videoId);
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
        const comment = await VideoService.postComment(videoId,comments);
        console.log(comment)
        res.json(comment);
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
        const replycomment = await VideoService.postReply(videoId,reply);
        // console.log(comment)
        res.json(replycomment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
