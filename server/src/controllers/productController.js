const productService = require('../services/productService')
const Product = require('../../src/models/productModel')


exports.addProduct = async(req,res)=>{
    try{
        const newProduct = await productService.addProduct(req.body);
        res.status(201).json(newProduct);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.updateProduct = async(req,res)=>{
    const productId = req.params.productId;
    const updatedData = req.body;

    try {
        const updatedProduct = await productService.updateProduct(productId, updatedData);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

exports.getProductDetails = async (req, res) => {
  try {
    const { productName, brand, size } = req.params;
    const product = await ProductService.getProductDetails(productName, brand, size);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProduct = async(req,res ) =>{
  try {
      const productId = req.params.productId;
      const Product = await productService.getProduct(productId);
      res.status(201).json(Product);
  }
  catch(error){
      res.status(400).json({message:error.message});
  }
  
}

exports.addNewProduct = async (req,res) => {

    try{
        const {productName, brand ,description ,parentCompany ,productCategory,packagingMaterial,packagingMaterialTouching
            , size, count, countryProduct, servingSize ,
            sugarType ,
            lactose  ,
            vitamin ,
            mineral ,
            omega ,
            acids ,
            probiotics ,
            method  ,
            total ,
            remarks  ,
            ingredients  ,
            energy1 ,
            energy2  ,
            protein1  ,
            protein2   ,
            totalFat1 ,
            totalFat2  ,
            SFA1 ,
            SFA2  ,
            carbo1  ,
            carbo2 ,
            sugar1 ,
            sugar2 ,
            salt1  ,
            salt2  ,
            sodium1  ,
            sodium2  ,
            transFat1  ,
            transFat2  ,
            ash1  ,
            ash2  ,WPROfoodcode  ,
            WPROPermitted  ,
            WPROPermittedRemark  ,
            SEAROfoodcode  ,
            SEAROpermitted ,
            SEAROpermittedRemark  ,
            SLfoodCode ,
            SLpermitted ,
            SLfoodcodePermittedRemark ,
            status,
            createdTime  ,
            CreatedData  } = req.body;
            console.log(req.body)
            const videoPath = req.files[0].path
            console.log(videoPath)
            console.log(req.files)
            const imageFront = req.files[1].path
            const imageBack = req.files[2].path
            const imageLeft = req.files[3].path
            const imageRight = req.files[4].path
            // const newProduct = await productService.addNewProduct();
    
            const newProduct = new Product({productName, brand ,
                description ,
                parentCompany ,
                productCategory ,
                packagingMaterial  ,
                packagingMaterialTouching ,
                size,
                count,
                countryProduct  ,
                servingSize ,
                sugarType ,
                lactose  ,
                vitamin ,
                mineral ,
                omega ,
                acids ,
                probiotics ,
                method  ,
                total ,
                remarks  ,
                ingredients  ,
                energy1 ,
                energy2  ,
                protein1  ,
                protein2  ,
                totalFat1 ,
                totalFat2  ,
                SFA1 ,
                SFA2  ,
                carbo1  ,
                carbo2 ,
                sugar1 ,
                sugar2 ,
                salt1 ,
                salt2  ,
                sodium1  ,
                sodium2  ,
                transFat1  ,
                transFat2  ,
                ash1  ,
                ash2  ,
                WPROfoodcode  ,
                WPROPermitted  ,
                WPROPermittedRemark  ,
                SEAROfoodcode  ,
                SEAROpermitted ,
                SEAROpermittedRemark  ,
                SLfoodCode ,
                SLpermitted ,
                SLfoodcodePermittedRemark ,
                createdTime  ,
                CreatedData ,
                status,
                videoPath  ,
                imageFront,
                imageBack ,
                imageLeft,
                imageRight})
        // const newProduct = new Product({ videoPath});
        console.log(newProduct)
        await newProduct.save();
       
        return res.status(201).json({success: true, newProduct});

    } catch(error){
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error'});
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
          const fact = req.body.healthfact;
          const productStatus = await productService.saveProduct(productId,fact);
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
