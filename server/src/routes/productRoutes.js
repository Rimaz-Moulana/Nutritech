const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add', productController.addProduct);
router.get('/getAll', productController.getAllProduct);
router.get('/reviewproduct/:productId', productController.fetchSensorManagerReview)
router.delete('/reviewproduct/:productId', productController.deleteProduct);
router.post('/reviewproduct/:productId', productController.savePendingProduct );
router.get('/sensormanagerproducts', productController.getAllPendingProducts);
router.get('/similarproducts/:productId', productController.getAllSimilarProducts);

module.exports = router;

