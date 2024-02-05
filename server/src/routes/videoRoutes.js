const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

router.get('/all', videoController.getAllVideos);
router.get('/annotated-videos', videoController.getAnnotatedVideos);
router.get('/unannotated-videos', videoController.getUnannotatedVideos);
router.post('/uploadvideo', videoController.postVideos);
router.get('/history',videoController.getuploadhistory)

router.post('/upload',videoController.upload.single('file'), videoController.postVideo);

router.get('/videos', videoController.getVideos);
router.post('/addvideo' , videoController.addvideo);


module.exports = router;