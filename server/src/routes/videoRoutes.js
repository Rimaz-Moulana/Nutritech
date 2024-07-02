const express = require('express');
const videoController = require('../controllers/videoController');
const productController = require('../controllers/productController');
const router = express.Router();
const multer =require('multer');

//video uploading
const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, '/Nutritech/frontend/public/videos');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/upload', upload.single('video'), videoController.addvideo); // video upload
router.post('/industry/add', upload.single('video') , productController.addNewProduct);

router.get('/all', videoController.getAllVideos);
router.get('/annotated-videos', videoController.getAnnotatedVideos);
router.get('/reannotate-videos', videoController.getReannotateVideos);
router.get('/annotatedvideosExpert', videoController.getAnnotatedVideosForExperts);

router.get('/unannotated-videos', videoController.getUnannotatedVideos);
router.post('/uploadvideo', videoController.postVideoDetails);
// router.post('/uploadvideo', videoController.postVideoDetails);
router.get('/history',videoController.getuploadhistory)
router.get('/sensormanagernewvideo',videoController.getpendingvideos)
router.get('/sensormanagerallvideos',videoController.getsensormanagernallvideos)

router.post('/reviewvideo/:videoId', videoController.saveSensorManagerReview );
router.delete('/reviewvideo/:videoId', videoController.deleteVideo);
router.get('/annotation/:videoId', videoController.getAnnotatingVideo);

// router.get('/reviewvideo/:videoId', videoController.handleReview ); // list the vieos where brand, product and variation are similar to video that is going to review
router.get('/reviewvideo/:videoId', videoController.fetchSensorManagerReview );//get the video to review
router.get('/brandproducts/:videoId', videoController.getSimilarAds );

router.get('/allUploadedVideos', videoController.getAllUploadedVideos );
router.get('/allPendingUploadedVideos', videoController.getPendingUploadedVideos );
router.get('/allUnannotatedUploadedVideos', videoController.getUnannotatedUploadedVideos );
router.get('/allAnnotatedUploadedVideos', videoController.getAnnotatedUploadedVideos );
router.get('/allRedUploadedVideos', videoController.getRedUploadedVideos );
router.get('/allGreenUploadedVideos', videoController.getGreenUploadedVideos );
// router.post('/redflag/:videoId', videoController.updateExpertReviewtored );
router.post('/flag/:videoId', videoController.updateExpertFlagReview );
router.get('/redflag', videoController.AllRedFlagVideos );
router.get('/greenflag', videoController.AllGreenFlagVideos );
router.post('/comment/:videoId', videoController.postExpertComment );
router.post('/message/:videoId', videoController.postExpertMessage );
router.post('/reply/:videoId', videoController.postIndustryReply );
router.post('/finalcomment/:videoId', videoController.postFinalComment);
router.get("/finalcomment", videoController.finalCommentVideos)
router.get("/report/:videoId", videoController.videoReport)
router.post('/finalflag/:videoId', videoController.updateExpertHeadFlagReview );
router.post('/decision/:videoId', videoController.updateDecision );
router.post('/finaldecision/:videoId', videoController.updateFinalDecision );
router.patch('/flagupdate/:videoId', videoController.updateExpertFlagReviewUpdate );


module.exports = router;