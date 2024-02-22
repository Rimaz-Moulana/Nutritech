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

exports.addNewProduct = async (req,res) => {

    try{
        // const productArray = req.body;
        console.log(req.body)
        const videoPath = req.file.path
        // productArray.videoFile = videoPath;
        console.log(videoPath)
        const newProduct = await productService.addNewProduct(videoPath);
        return res.status(201).json(newProduct);

    } catch(error){
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error'});
    }

}
