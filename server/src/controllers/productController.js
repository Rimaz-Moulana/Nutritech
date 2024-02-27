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


exports.getAllPendingProducts = async(req,res ) =>{
    try {
        const allProduct = await productService.getPendingProducts();
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
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.json({ success: true, product });
    } catch (error) {
      console.error('Error fetching details:', error);
      res.status(500).json({ success: false, message: 'Error fetching product' });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      console.log(productId)
      await productService.deleteProducts(productId);
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.savePendingProduct= async (req,res)=>{
    try {
          const productId = req.params.productId;
          const productStatus = await productService.saveProduct(productId);
          res.json(productStatus);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }


  exports.getAllSimilarProducts = async (req, res) => {
    try {
      const productId = req.params.productId;
      const products = await productService.getSimilarProducts(productId);
      console.log("videos"+products)
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
