const Product = require('../models/productModel')

exports.addProduct = async (productDetails) => {
    try{
        const newProduct = new Product(productDetails);
        return await newProduct.save();
    }
    catch(error){
        throw new Error(error.message);
    }
};

exports.updateProduct = async (productId, productData) => {
  try{
    console.log(productData,productId)
    return await Product.findByIdAndUpdate(productId, productData, {new: true});
  }catch (error) {
    throw error;
  }
}

exports.getAllProducts = async() => {
    return await Product.find();
}

exports.addNewProduct = async (newProductDetails) => {
    try{
        const newProduct = new Product(newProductDetails)
        return await newProduct.save();
    }
    catch(error){
        // throw new Error(error.message);
    }
}

exports.getPendingProducts= async() => {
    return await Product.find({ status: 'pending' });
}

exports.getProduct = async(productId)=>{
    return await Product.findOne({ _id: productId })
  }

  exports.deleteProducts = async (productId) => {
    console.log(productId)
    try {
      return await Product.findOneAndDelete({ _id: productId});
    } catch (error) {
      console.error(`Error deleting product: ${error.message}`);
      throw error;
    }
  };


  exports.saveProduct = async (productId,fact) => {
    try {
      return await Product.findByIdAndUpdate(
        productId,
        {
          status: 'reviewed',
          healthfact: fact,
        //   reviewedtime: getCurrentDateTime(),
        //   revieweddate: new Date().toLocaleDateString(),
        },
        { new: true }
      );
    } catch (error) {
      console.error(`Error saving product: ${error.message}`);
      throw error;
    }
  };


  exports.getSimilarProducts = async (productId) => {
    console.log(productId)
    try {
      // Find the video with the provided videoId
      const currentProductData = await Product.findOne({ _id: productId });
      // console.log(currentVideoData);
  
      if (!currentProductData) {
        throw new Error('Product not found');
      }
  
      const { brand, productName, variation } = currentProductData;
  
      return await Product.find({
        brand,
        productName,
        variation,
        status: { $in: ['reviewed'] },
        _id: { $ne: productId } // Exclude the current product from the results
      });
  
    
      
    } catch (error) {
      console.error('Error retrieving sensor manager review products:', error);
      throw error;
    }
  };
