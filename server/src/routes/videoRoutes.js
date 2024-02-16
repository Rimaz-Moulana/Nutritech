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

router.post('/upload', upload.single('video'), videoController.addvideo);

router.get('/all', videoController.getAllVideos);
router.get('/annotated-videos', videoController.getAnnotatedVideos);
router.get('/unannotated-videos', videoController.getUnannotatedVideos);
router.post('/uploadvideo', videoController.postVideoDetails);
// router.post('/uploadvideo', videoController.postVideoDetails);
router.get('/history',videoController.getuploadhistory)
router.get('/sensormanagernewvideo',videoController.getpendingvideos)
router.get('/reviewvideo/:videoId', videoController.fetchSensorManagerReview );
router.post('/reviewvideo/:videoId', videoController.saveSensorManagerReview );
router.delete('/reviewvideo/:videoId', videoController.deleteVideo);
router.get('/annotation/:videoId', videoController.getAnnotatingVideo);

module.exports = router;