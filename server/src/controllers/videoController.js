const VideoModel = require('../models/videoModel');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find();
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAnnotatedVideos = async (req, res) => {
    try {
      const videos = await VideoModel.find({ status: 'annotated' });
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.getUnannotatedVideos = async (req, res) => {
    try {
      const videos = await VideoModel.find({ status: 'unannotated' });
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.postVideoDetails = (req, res) => {
        VideoModel.create(req.body)
            .then(videos => res.json(videos))
            .catch(err => res.json(err))
    }

exports.getuploadhistory =async (req, res) => {
        try {
            const ITNVideos = await VideoModel.find({ uploader: 'ITN' });
            res.json(ITNVideos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

// const multer = require('multer')
// const videoService = require('../services/videoService');

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         return cb(null, "/public/videos")
//     },
//     filename: function(req, file, cb){
//         return cb(null, `${Date.now()}_${file.originalname}`)
//     }

// })

// exports.upload = multer({storage})

// exports.postVideo = (req,res) =>{
//     console.log(req.body)
//     console.log(req.file)
// }

// exports.getVideos = async(req,res) => {
//     try{
//         const videos = await videoService.getAllVideos();
//         res.json(videos);
//     }
//     catch(err){
//         res.status(500).json({error: err.message});
//     }
// }

// exports.addvideo = async (req,res) => {
//     try{
//         const newVideo = await videoService.addVideo(req.body);
//         res.status(201).json(newVideo);
//     }
//     catch(err){
//         res.status(400).json({error: err.message});
//     }
// };

