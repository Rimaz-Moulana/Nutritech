const VideoModel = require('../models/videoModel');
const AnnotationService =require('../services/annotationService')

const getAnnotationHistory = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await AnnotationService.getAnnotatorAnnotationHistory(videoId);

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    const annotations = video.annotations;

    res.json({ success: true, annotations });
  } catch (error) {
    console.error('Error fetching annotations:', error);
    res.status(500).json({ success: false, message: 'Error fetching annotations' });
  }
};

const postAnnotations =  async (req, res) => {
  const videoId = req.params.videoId;
  const annotations = req.body.annotations;

  try {
    const updatedVideo = await AnnotationService.postAnnotations(videoId, annotations, req);
    res.json(updatedVideo);
  } catch (error) {
    console.error(`Error in postAnnotations controller: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAnnotationHistory,
  postAnnotations,
};



