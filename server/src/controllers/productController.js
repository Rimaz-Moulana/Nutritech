const productService = require('../services/productService')
const Product = require('../../src/models/productModel')
const Video = require("../../src/models/videoModel")


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

exports.getDemo = async(req,res)=>{
  try{
    const {size,product,brand} = req.params;
    // const sizeNumber = parseInt(size, 10);
    const demo = await productService.getDemo(size,product,brand);
    
    if(!demo){
      return res.status(404).json({message:"Product not found"});
    }
    res.status(200).json(demo);
  }
  catch (error){
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getProductDetails = async (req, res) => {
  try {
    const { product, brand, unit,size } = req.params;
    const products = await productService.getProductDetails(product, brand,unit);
    console.log(products);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDetailsOfProduct = async (req, res) => {
  try {
    const { productName, brand } = req.params;
    const product = await productService.getDetails(productName, brand);

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
      console.log(req.body)
    try{
        const {
            product,
            brand ,
            description ,
            parentCompany ,
            category,
            packagingMaterial,
            packagingMaterialTouching, 
            unit, 
            size, 
            countryProduct, 
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
            status,
            createdAt  ,
            createdIn  } = req.body;
            //console.log(req.body)
            //const videoPath = req.files[0].path
           // console.log(videoPath)
            //console.log(req.files)
            let videoPath = null;
            let imageLeft = null;
            let imageFront = null;
            let imageBack = null;
            let imageRight = null;

            
            if(req.files.length==2){
              imageFront = req.files[0].path;
              imageBack = req.files[1].path;
            }
            else if(req.files.length == 3){
              if (req.files[0]) videoPath = req.files[0].path;
              imageFront = req.files[1].path;
              imageBack = req.files[2].path;
            }
            else{
              if (req.files[0]) videoPath = req.files[0].path;
              imageFront = req.files[1].path;
              imageBack = req.files[2].path;
              if (req.files[3]) imageLeft = req.files[3].path;
              if (req.files[4]) imageRight = req.files[4].path;
            }

            const duration = req.body.duration;
            // const newProduct = await productService.addNewProduct();
    
            const newProduct = new Product({
                product, 
                brand ,
                description ,
                parentCompany ,
                category ,
                packagingMaterial  ,
                packagingMaterialTouching ,
                unit,
                size,
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
                createdAt  ,
                createdIn ,
                status,
                videoPath  ,
                imageFront,
                imageBack ,
                imageLeft,
                imageRight})
        // const newProduct = new Product({ videoPath});

        console.log(req.body.duration)
        if(videoPath){
          const newVideo = new Video({
            category,
            product, 
            brand,
            unit,
            size,
            videoPath,
            createdAt  ,
            createdIn , 
            duration,
            status,
            uploader: 'Sirasa'
            
        });
          await newVideo.save();
        }
        

        // Save the new video
        

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
          console.log(fact);
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
