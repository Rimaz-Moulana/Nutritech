const Video = require('../models/videoModel')

exports.getAllVideos = async () => {
    return await Video.find();
};

