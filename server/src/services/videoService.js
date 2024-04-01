const VideoModel = require('../models/videoModel');

const getCurrentDateTime = () => {
  const currentDate = new Date();
  const formattedDateTime = `${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;
  return formattedDateTime;
};

const padZero = (num) => (num < 10 ? `0${num}` : num);


exports.getAnnotatorAllVideos = async (req, res) => { 
    return await VideoModel.find({ status: { $in: ['annotated', 'unannotated'] } });
};


exports.getAnnotatorUnannotatedVideos = async(req,res)=>{
  return await VideoModel.find({ status: 'unannotated' })
}

exports.getAnnotatorAnnotatedVideos = async(req,res)=>{
  return await VideoModel.find({ status:{ $in: ['annotated','red','green']} })
}

exports.getAnnotatedVideosForExpert = async(req,res)=>{
  return await VideoModel.find({ status:'annotated'})
}



exports.getAnnotationVideo = async(videoId)=>{
  return await VideoModel.find({ _id: videoId })
}

exports.postmediavideodetails = async(req,res)=>{
    return await VideoModel.create(req.body)
}

exports.getmediahistory = async(req,res)=>{
    return await VideoModel.find({ uploader: 'Sirasa' });
}

exports.getsensormanagernewvideos= async(req,res)=>{
  return await VideoModel.find({ status: 'pending' });

}
exports.getsensormanagerallvideo= async(req,res)=>{
  return await VideoModel.find({ status:{ $in: ['pending','unannotated']} });

}


exports.getSensorManagerReviewVideos = async(videoId)=>{
  return await VideoModel.findOne({ _id: videoId })
}

exports.saveSensorManagerReviewStatus = async (videoId) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        status: 'unannotated',
        reviewedtime: getCurrentDateTime(),
        revieweddate: new Date().toLocaleDateString(),
      },
      { new: true }
    );
  } catch (error) {
    console.error(`Error saving annotations: ${error.message}`);
    throw error;
  }
};

exports.deleteVideo = async (videoId) => {
  try {
    const deletedVideo = await VideoModel.findByIdAndDelete(videoId);
    return deletedVideo;
  } catch (error) {
    console.error(`Error deleting video: ${error.message}`);
    throw error;
  }
};

exports.getSimilarProductAds = async (videoId) => {
  console.log(videoId)
  try {
    // Find the video with the provided videoId
    const currentVideoData = await VideoModel.findOne({ _id: videoId });
    // console.log(currentVideoData);

    if (!currentVideoData) {
      throw new Error('Video not found');
    }

    const { brand, product, variation } = currentVideoData;

    return await VideoModel.find({
      brand,
      product,
      variation,
      status: { $in: ['annotated', 'unannotated', 'pending'] },
      _id: { $ne: videoId } // Exclude the current video from the results
    });

  
    
  } catch (error) {
    console.error('Error retrieving sensor manager review videos:', error);
    throw error;
  }
};

exports.getAll = async (req, res) => {
    return await VideoModel.find({
      brand: 'Maggi',
      status: { $in: ['annotated', 'unannotated', 'pending', 'green', 'red'] }
    });
  
};


exports.updateReviewRed = async (videoId) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        status: 'red',
        expertreviewedtime: getCurrentDateTime(),
        expertrevieweddate: new Date().toLocaleDateString(),
      },
      { new: true }
    );
  } catch (error) {
    console.error(`Error saving annotations: ${error.message}`);
    throw error;
  }
};

exports.updateReviewGreen = async (videoId) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        status: 'green',
        expertreviewedtime: getCurrentDateTime(),
        expertrevieweddate: new Date().toLocaleDateString(),
      },
      { new: true }
    );
  } catch (error) {
    console.error(`Error saving annotations: ${error.message}`);
    throw error;
  }
};


exports.getAllRedFlagVideos= async(req,res)=>{
  return await VideoModel.find({ status: 'red' });

}

exports.getAllGreenFlagVideos= async(req,res)=>{
  return await VideoModel.find({ status: 'green' });

}

exports.postComment = async (videoId, comments, req) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $push: {
          comment: {
            text: comments,
            repliedtime: getCurrentDateTime(),
            replieddate: new Date().toLocaleDateString(),
          },
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error(`Error saving comment: ${error.message}`);
    throw error;
  }
};


exports.postReply = async (videoId, replycomment, req) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $push: {
          reply: {
            text: replycomment,
            commentedtime: getCurrentDateTime(),
            commenteddate: new Date().toLocaleDateString(),
          },
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error(`Error saving comment: ${error.message}`);
    throw error;
  }
};
