const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

router.get('/all', videoController.getAllVideos);
router.get('/annotated-videos', videoController.getAnnotatedVideos);
router.get('/unannotated-videos', videoController.getUnannotatedVideos);
router.post('/uploadvideo', videoController.postVideos);
router.get('/history',videoController.getuploadhistory)

module.exports = router;