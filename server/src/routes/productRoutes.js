const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer =require('multer');

//video uploading
const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, '/Nutritech/frontend/src/assets/videos');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

const storage1 = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, '/Nutritech/frontend/src/assets/Images');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload1 = multer({storage: storage1});


router.post('/industry/add', upload.single('video') , productController.addNewProduct);

router.post('/add', productController.addProduct);
router.get('/getAll', productController.getAllProduct);


module.exports = router;