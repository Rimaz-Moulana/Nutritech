const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer =require('multer');

//video uploading & images downloading 
const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, '/Nutritech/frontend/src/assets/videos');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/industry/add', upload.any('video/images') , productController.addNewProduct);

router.post('/add', productController.addProduct);
router.put('/industry/update/:productId', productController.updateProduct);
router.get('/getAll', productController.getAllProduct);
router.get('/industry/getProduct/:productId', productController.getProduct)
router.get('/reviewproduct/:productId', productController.fetchSensorManagerReview)
router.delete('/reviewproduct/:productId', productController.deleteProduct);
router.post('/reviewproduct/:productId', productController.savePendingProduct );
router.get('/sensormanagerproducts', productController.getAllPendingProducts);
router.get('/similarproducts/:productId', productController.getAllSimilarProducts);
router.get("/product/:productName/:brand/:size/:unit", productController.getProductDetails);

module.exports = router;

