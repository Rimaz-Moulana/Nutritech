const Video = require('../models/videoModel')

exports.getAllVideos = async () => {
    return await Video.find();
};

exports.addVideo = async (videoData) => {
    const newVideo = new Video(videoData);
    return await newVideo.save()
}