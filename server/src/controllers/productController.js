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