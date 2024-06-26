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

exports.getDemo = async (size,product,brand) => {
  try {

    // Await the database query and handle errors
    const products = await Product.find({size:size,product:product,brand:brand});

    return products;
  } catch (error) {
    console.error('Error in getDemo:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}

exports.getProductDetails = async(product,brand,size,unit) =>{
  return await Product.find({ product:product,brand:brand,size:size,unit:unit});
}

exports.getDetails = async(productName,brand) =>{
  return await Product.find({ productName:productName,brand:brand});
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
  
      if (!currentProductData) {
        throw new Error('Product not found');
      }
  
      const { brand, productName, variation } = currentProductData;
  
      return await Product.find({
        brand,
        productName,
        variation,
        status: { $in: ['reviewed','pending'] },
        _id: { $ne: productId } // Exclude the current product from the results
      });
  
    
      
    } catch (error) {
      console.error('Error retrieving sensor manager review products:', error);
      throw error;
    }
  };
