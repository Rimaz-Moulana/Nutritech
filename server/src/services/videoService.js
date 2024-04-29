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
      status: { $in: ['annotated', 'unannotated', 'pending','green','red'] },
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

exports.updateReview = async (videoId, panelstatus) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $set: {
          panelstatus:panelstatus,
          
        }
        
      },
      {
        new: true
      }
    );
  } catch (error) {
    console.error(`Error saving reviews: ${error.message}`);
    throw error;
  }
};



exports.updateFinalReview = async (videoId,finalflag ) => {
  const finalstatus=finalflag.status;
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $set: {
          finalflag:finalflag,
          status:finalstatus
        }
      },
      {
        new: true
      }
    );
  } catch (error) {
    console.error(`Error saving reviews: ${error.message}`);
    throw error;
  }
};
// exports.updateReviewGreen = async (videoId, email, status = "green") => {
//   try {
//     return await VideoModel.findByIdAndUpdate(
//       videoId,
//       {
//         $set: {
//           "panelstatus.$.status": status,
//           "panelstatus.$.email": email,
//           "panelstatus.$.expertreviewedtime": getCurrentDateTime(),
//           "panelstatus.$.expertrevieweddate": new Date().toLocaleDateString()
//         }
//       },
//       {
        
//         new: true
//       }
//     );
//   } catch (error) {
//     console.error(`Error saving reviews: ${error.message}`);
//     throw error;
//   }
// };



exports.getAllRedFlagVideos= async(req,res)=>{
  return await VideoModel.find({ status: 'red' });

}

exports.getAllGreenFlagVideos= async(req,res)=>{
  return await VideoModel.find({ status: 'green' });

}

exports.postComment = async (videoId, comments, email, req) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $push: {
          comment: {
            text: comments,
            commenter:email,
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


// //video to text
// async function convertVideoToText(videoPath) {
//   const audioPath = 'temp_audio.wav'; // Temporary audio file

//   return new Promise((resolve, reject) => {
//       ffmpeg(videoPath)
//           .audioCodec('pcm_s16le')
//           .audioFrequency(44100)
//           .audioChannels(2)
//           .save(audioPath)
//           .on('end', async () => {
//               try {
//                   const file = fs.readFileSync(audioPath);
//                   const audioBytes = file.toString('base64');

//                   const audio = {
//                       content: audioBytes,
//                   };
//                   const config = {
//                       encoding: 'LINEAR16',
//                       sampleRateHertz: 44100,
//                       languageCode: 'si-LK', // Sinhala language code
//                   };

//                   const request = {
//                       audio: audio,
//                       config: config,
//                   };

//                   const [response] = await client.recognize(request);
//                   const transcription = response.results
//                       .map((result) => result.alternatives[0].transcript)
//                       .join('\n');

//                   resolve(transcription);
//               } catch (error) {
//                   reject(error);
//               }
//           })
//           .on('error', (err) => {
//               reject(err);
//           });
//   });
// }

// module.exports = { convertVideoToText };


exports.postFinal = async (videoId, comments, email, req) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $push: {
          finalcomment: {
            text: comments,
            commenter:email,
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



exports.postReply = async (videoId, replycomment, email, req) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $push: {
          reply: {
            text: replycomment,
            replyer:email,
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
