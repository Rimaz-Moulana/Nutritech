
const videoService = require('../services/videoService');
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


// exports.getVideosById = async(req,res) ={


exports.addvideo = async (req,res) => {

    try{
        const { brand, product , variation , createdAt} = req.body;
        const videoPath = req.file.path
        console.log(req.body)
        const newVideo = new Video({brand,product,variation, videoPath, createdAt, status: 'pending', uploader:'Sirasa'});
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

