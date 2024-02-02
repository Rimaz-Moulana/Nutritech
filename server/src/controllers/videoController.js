const multer = require('multer')
const videoService = require('../services/videoService');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null, "/public/videos")
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }

})

exports.upload = multer({storage})

exports.postVideo = (req,res) =>{
    console.log(req.body)
    console.log(req.file)
}

exports.getVideos = async(req,res) => {
    try{
        const videos = await videoService.getAllVideos();
        res.json(videos);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.addvideo = async (req,res) => {
    try{
        const newVideo = await videoService.addVideo(req.body);
        res.status(201).json(newVideo);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
};

