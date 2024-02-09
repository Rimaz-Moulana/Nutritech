const express = require('express');
const videoController = require('../controllers/videoController')
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

router.get('/videos', videoController.getVideos);
router.post('/addvideo' , videoController.addvideo);


module.exports = router;