// videoService.js
const Video = require('../models/videoModel'); // Adjust based on your model

exports.getAnnotationsByVideoId = async (videoId) => {
  // Logic to fetch annotations for the videoId from the database
  const annotations = await Video.findOne({ _id: videoId }).select('annotations');
  return annotations;
};
