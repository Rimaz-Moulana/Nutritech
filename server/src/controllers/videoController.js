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

  exports.postVideos = (req, res) => {
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

