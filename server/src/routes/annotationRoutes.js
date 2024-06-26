const express = require('express');
const router = express.Router();
const annotationController = require('../controllers/annotationController');
const postAnnotations =require('../controllers/annotationController')

router.get('/annotationhistory/:videoId', annotationController.getAnnotationHistory);
router.post('/annotation/:videoId', annotationController.postAnnotations);
router.post('/reannotation/:videoId', annotationController.postReannotations);

module.exports = router;;
