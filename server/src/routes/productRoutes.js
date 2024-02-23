const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add', productController.addProduct);
router.get('/getAll', productController.getAllProduct);
// router.get('/sensormanagerproducts', productContoller.getAllproducts)

module.exports = router;