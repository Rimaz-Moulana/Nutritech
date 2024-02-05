const VideoModel = require('../models/videoModel');

const getCurrentDateTime = () => {
  const currentDate = new Date();

  // Format the date and time as needed (e.g., "2024-02-01 12:30:45")
  const formattedDateTime = `${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;

  return formattedDateTime;
};

// Helper function to pad a single digit number with a leading zero
const padZero = (num) => (num < 10 ? `0${num}` : num);

const getAnnotationHistory = async (req, res) => {
  try {
    const videoId = req.params.videoId;

    // Find annotations based on the videoId
    const video = await VideoModel.findOne({ _id: videoId });

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
  try {
    const videoId = req.params.videoId;
    // Log the annotations data on the server
    console.log('Annotations data received on the server:', req.body.annotations);

    // Assuming VideoModel has a field called annotations, update it accordingly
    const updatedVideo = await VideoModel.findByIdAndUpdate(
      videoId,
      { $set: { annotations: req.body.annotations } ,
      status: 'annotated',
      annotatedtime:getCurrentDateTime(),
      annotateddate:new Date().toLocaleDateString(),
  },
      { new: true }
    );

    res.json(updatedVideo);
  } catch (error) {
    console.error('Error saving annotations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAnnotationHistory,
  postAnnotations,
};



