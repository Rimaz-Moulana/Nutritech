const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add', productController.addProduct);
router.get('/getAll', productController.getAllProduct);
router.get('/reviewproduct/:productId', productController.fetchSensorManagerReview)

module.exports = router;