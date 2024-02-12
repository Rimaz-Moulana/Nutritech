const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();
const multer =require('multer');

//video uploading
const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, '/NutriTech/Nutritech/frontend/src/assets/videos');
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
router.post('/uploadvideo', videoController.postVideoDetails);
router.get('/history',videoController.getuploadhistory)
router.get('/sensormanagernewvideo',videoController.getpendingvideos)




// router.post('/upload',videoController.upload.single('file'), videoController.postVideo);
// router.post('/upload',videoController.upload.single('file'), videoController.postVideo);

// router.get('/videos', videoController.getVideos);
// router.post('/addvideo' , videoController.addvideo);
// router.get('/videos', videoController.getVideos);
// router.post('/addvideo' , videoController.addvideo);


module.exports = router;