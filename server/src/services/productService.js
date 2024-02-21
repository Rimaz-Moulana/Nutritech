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

exports.getAllProducts = async() => {
    return await Product.find();
}

exports.addNewProduct = async (newProductDetails) => {
    try{
        const newProduct = new Product(newProductDetails)
        return await newProduct.save();
    }
    catch(error){

    }
}