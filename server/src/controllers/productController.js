const productService = require('../services/productService')

exports.addProduct = async(req,res)=>{
    try{
        const newProduct = await productService.addProduct(req.body);
        res.status(201).json(newProduct);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.getAllProduct = async(req,res ) =>{
    try {
        const allProduct = await productService.getAllProducts();
        res.status(201).json(allProduct);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
}

exports.fetchSensorManagerReview = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await productService.getProduct(productId);
      console.log(product)
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.json({ success: true, product });
    } catch (error) {
      console.error('Error fetching details:', error);
      res.status(500).json({ success: false, message: 'Error fetching product' });
    }
  };

