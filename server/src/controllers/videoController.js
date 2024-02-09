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
  
  exports.getUnannotatedVideos = async (req, res) => {
    try {
      const videos = await VideoService.getAnnotatorUnannotatedVideos();
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.postVideoDetails= async (req,res)=>{
    try {
          const ITNVideos = await VideoService.postmediavideodetails(req);
          console.log("itn videos: ",ITNVideos)
          res.json(ITNVideos);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }

exports.getuploadhistory= async (req,res)=>{
  try {
        const ITNVideos = await VideoService.getmediahistory();
        console.log("itn videos: ",ITNVideos)
        res.json(ITNVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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