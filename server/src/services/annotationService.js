const VideoModel = require('../models/videoModel');

exports.getAnnotatorAnnotationHistory = async(videoId)=>{
  return await VideoModel.findOne({ _id: videoId })
}
const getCurrentDateTime = () => {
  const currentDate = new Date();
  const formattedDateTime = `${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;
  return formattedDateTime;
};

const padZero = (num) => (num < 10 ? `0${num}` : num);

exports.postAnnotations = async (videoId, annotations, req) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $set: { annotations: annotations },
        status: 'annotated',
        annotatedtime: getCurrentDateTime(),
        annotateddate: new Date().toLocaleDateString(),
      },
      { new: true }
    );
  } catch (error) {
    console.error(`Error saving annotations: ${error.message}`);
    throw error;
  }
};



