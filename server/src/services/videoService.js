const VideoModel = require('../models/videoModel');


const getCurrentDateTime = () => {
  const currentDate = new Date();
  const formattedDateTime = `${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;
  return formattedDateTime;
};

const padZero = (num) => (num < 10 ? `0${num}` : num);

exports.getAnnotatorAllVideos = async (req, res) => { 
    return await VideoModel.find({ status: { $in: ['annotated', 'unannotated','Red','Green','reannotate'] } });
};


exports.getAnnotatorUnannotatedVideos = async(req,res)=>{
  return await VideoModel.find({ status: 'unannotated' })
}

exports.getAnnotatorAnnotatedVideos = async(req,res)=>{
  return await VideoModel.find({ status:{ $in: ['annotated','Red','Green']} })
}

exports.getAnnotatorReannotateVideos = async(req,res)=>{
  return await VideoModel.find({ status:'reannotate' })
}

exports.getAnnotatedVideosForExpert = async(req,res)=>{
  return await VideoModel.find({ status:"annotated"})
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
  return await VideoModel.find({ status:{ $in: ['pending','unannotated','annotated','Red','Green','reannotate']} });

}


exports.getSensorManagerReviewVideos = async(videoId)=>{
  return await VideoModel.findOne({ _id: videoId })
}

exports.saveSensorManagerReviewStatus = async (videoId,fact) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        status: 'unannotated',
        reviewedtime: getCurrentDateTime(),
        revieweddate: new Date().toLocaleDateString(),
        healthfact:fact,
        
      },
      { new: true }
    );
  } catch (error) {
    console.error(`Error saving annotations: ${error.message}`);
    throw error;
  }
};

exports.updateDecisionForUser = async (req, res) => {
  const { annotation, decision, email, type } = req.body;
  const { videoId } = req.params;
  console.log(annotation);
  console.log(type);
// status
  try {
    const video = await VideoModel.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
      
    }
    

    let targetAnnotation;
    if (type === "reannotations") {
      
      targetAnnotation = video.reannotations.find(reann =>
        reann.timestamp === annotation.timestamp &&
        reann.rule === annotation.rule &&
        reann.details === annotation.details &&
        reann.recommendation === annotation.recommendation
      );

      
    } else {
      targetAnnotation = video.annotations.find(ann =>
        ann.timestamp === annotation.timestamp &&
        ann.rule === annotation.rule &&
        ann.details === annotation.details &&
        ann.recommendation === annotation.recommendation
      );
    }

    // if (!targetAnnotation) {
    //   return res.status(404).json({ message: 'Annotation not found' });
    // }

    

    targetAnnotation.acceptance.push({
      user: email,
      decision:decision,
      date: new Date().toLocaleDateString(),
      time: getCurrentDateTime(),
    });


    await video.save();

    // res.status(200).json({ message: 'Decision added successfully' });
  } catch (error) {
    console.error(`Error saving decision: ${error.message}`);
    // res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateFinalDecisionForUser = async (req, res) => {
  const { annotation, decision, email, type } = req.body;
  const { videoId } = req.params;
  // console.log(type)
  
// status
  try {
    const video = await VideoModel.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
      
    }

    let targetAnnotation;
    if (type === "reannotations") {
      
      targetAnnotation = video.reannotations.find(reann =>
        reann.timestamp === annotation.timestamp &&
        reann.rule === annotation.rule &&
        reann.details === annotation.details &&
        reann.recommendation === annotation.recommendation
      );

      
    } else {
      targetAnnotation = video.annotations.find(ann =>
        ann.timestamp === annotation.timestamp &&
        ann.rule === annotation.rule &&
        ann.details === annotation.details &&
        ann.recommendation === annotation.recommendation
      );
    }

    // if (!targetAnnotation) {
    //   return res.status(404).json({ message: 'Annotation not found' });
    // }

    

    targetAnnotation.finalacceptance.push({
      user: email,
      decision:decision,
      date: new Date().toLocaleDateString(),
      time: getCurrentDateTime(),
    });


    await video.save();

    // res.status(200).json({ message: 'Decision added successfully' });
  } catch (error) {
    console.error(`Error saving decision: ${error.message}`);
    // res.status(500).json({ message: 'Internal Server Error' });
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
  // console.log(videoId)
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
      status: { $in: ['annotated', 'unannotated', 'reannotate','pending','Green','Red'] },
      _id: { $ne: videoId } // Exclude the current video from the results
    });

  
    
  } catch (error) {
    console.error('Error retrieving sensor manager review videos:', error);
    throw error;
  }
};

exports.getAll = async (req, res) => {
    return await VideoModel.find({
      // brand: 'Maggi',
      status: { $in: ['annotated', 'unannotated', 'reannotate', 'pending', 'Green', 'Red'] }
    }); 
};

exports.getPending = async (req, res) => {
  return await VideoModel.find({
    // brand: 'Maggi',
    status: 'pending' }
  ); 
};

exports.getUnannotated = async (req, res) => {
  return await VideoModel.find({
    // brand: 'Maggi',
    status:{ $in: [ 'unannotated', 'reannotate'] }
    });  
};

exports.getAnnotated = async (req, res) => {
  return await VideoModel.find({
    // brand: 'Maggi',
    status: 'annotated' }
  ); 
};

exports.getGreen = async (req, res) => {
  return await VideoModel.find({
    // brand: 'Maggi',
    status: 'Green' }
  ); 
};

exports.getRed = async (req, res) => {
  return await VideoModel.find({
    // brand: 'Maggi',
    status: 'Red' }
  ); 
};

exports.updateReview = async (videoId, panelstatus) => {
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $push: {
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
  // const finalstatus=finalflag.status;
  try {
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $set: {
          finalflag:finalflag,
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
  return await VideoModel.find({ status: 'Red' });

}

exports.getAllGreenFlagVideos= async(req,res)=>{
  return await VideoModel.find({ status: 'Green' });

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

exports.VideoReport = async (videoId)=> {
  try {
    //console.log(videoId);
    return await VideoModel.findOne({_id:videoId , status: "Red"});

  }catch(error){
    console.error(`Error saving comment: ${error.message}`);
    throw error;
  }
}

exports.finalCommentVideos = async(req,res)=>{
  try{
    return await VideoModel.find({status: {$in: ['annotated'] }});
  }
  catch (error) {
    console.error(`Error saving comment: ${error.message}`);
    throw error;
  }
}

exports.postMessage = async (videoId, comments, email, req) => {
  try {
    console.log(comments);
    return await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $push: {
          message: {
            text: comments,
            user:email,
            messagetime: getCurrentDateTime(),
            messagedate: new Date().toLocaleDateString(),
          },
        },

        $set:{
          status:"reannotate"
        }
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



//video to text
// const speechClient = new SpeechClient();

// const convertVideoToText = async (videoPath) => {
//     try {
//         // Reads a local audio file and converts it to text
//         const [response] = await speechClient.recognize({
//             config: {
//                 encoding: 'LINEAR16',
//                 sampleRateHertz: 16000,
//                 languageCode: 'si-LK', // Specify the language code for Sinhala
//             },
//             audio: {
//                 content: fs.readFileSync(videoPath).toString('base64'),
//             },
//         });

//         // Get transcription result
//         const transcription = response.results
//             .map(result => result.alternatives[0].transcript)
//             .join('\n');

//         return transcription;
//     } catch (error) {
//         console.error('Error converting audio to text:', error);
//         throw error;
//     }
// };

// module.exports = {
//     convertVideoToText,
// };

exports.postFinal = async (videoId, comments, email, req) => {
  try {
    const video = await VideoModel.findById(videoId);
    const finalstatus = video.finalflag;
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
        $set: {
          status:finalstatus,
          // status:finalstatus
        }
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
