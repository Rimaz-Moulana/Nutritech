const express = require('express');
const videoController = require('../controllers/videoController');
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
router.get('/all', videoController.getAllVideos);
router.get('/annotated-videos', videoController.getAnnotatedVideos);
router.get('/unannotated-videos', videoController.getUnannotatedVideos);
router.post('/uploadvideo', videoController.postVideoDetails);
// router.post('/uploadvideo', videoController.postVideoDetails);
router.get('/history',videoController.getuploadhistory)
router.get('/sensormanagernewvideo',videoController.getpendingvideos)

router.post('/reviewvideo/:videoId', videoController.saveSensorManagerReview );
router.delete('/reviewvideo/:videoId', videoController.deleteVideo);
router.get('/annotation/:videoId', videoController.getAnnotatingVideo);
// router.get('/reviewvideo/:videoId', videoController.handleReview ); // list the vieos where brand, product and variation are similar to video that is going to review
router.get('/reviewvideo/:videoId', videoController.fetchSensorManagerReview );//get the video to review
router.get('/brandproducts/:videoId', videoController.getSimilarAds );

router.get('/allUploadedVideos', videoController.getAllUploadedVideos );
router.post('/redflag/:videoId', videoController.updateExpertReviewtored );
router.post('/greenflag/:videoId', videoController.updateExpertReviewtogreen );
router.get('/redflag', videoController.AllRedFlagVideos );
router.get('/greenflag', videoController.AllGreenFlagVideos );

module.exports = router;