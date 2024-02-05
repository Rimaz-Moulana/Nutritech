const express = require('express');
const videoController = require('../controllers/videoController')
const router = express.Router();

router.post('/upload',videoController.upload.single('file'), videoController.postVideo);

router.get('/videos', videoController.getVideos);
router.post('/addvideo' , videoController.addvideo);


module.exports = router;