const videoService = require('../services/videoService');
const Video = require('../models/videoModel')

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

// exports.getVideosById = async(req,res) ={


exports.addvideo = async (req,res) => {

    try{
        console.log(req.body,req.file)
        const { brand, product , variation , createdAt} = req.body;
        const videoPath = req.file.path
        console.log(req.body,req.file)
        const newVideo = new Video({brand,product,variation, videoPath, createdAt});
        console.log(newVideo)
        await newVideo.save();
       
        return res.status(201).json({success: true, newVideo});

    } catch(error){
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error'});
    }

}
