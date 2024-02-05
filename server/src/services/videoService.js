const VideoModel = require('../models/videoModel');

exports.getAllVideo = async () => {
  try {
    const videos = await VideoModel.find();
    console.log(videos)
    return videos;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to find videos');
  }
};

exports.getAnnotatedVideo = async () => {
  try {
      const annotatedVideos = await VideoModel.find({ status: 'annotated' });
      res.json(annotatedVideos);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUnannotatedVideo = async () => {
  try {
      const unannotatedVideos = await VideoModel.find({ status: 'unannotated' });
      res.json(unannotatedVideos);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.addVideo = async (videoData) => {
    const newVideo = new Video(videoData);
    return await newVideo.save()
}
