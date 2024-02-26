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
        const {productName, brand ,description ,parentCompany ,productCategory,packagingMaterial,packagingMaterialTouching
            , variation, countryProduct, servingSize ,
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
            CreatedData ,imagePaths  } = req.body;
            console.log(req.body)
            const videoPath = req.file.path
            console.log(videoPath)
            // const newProduct = await productService.addNewProduct();
    
            const newProduct = new Product({productName, brand ,
                description ,
                parentCompany ,
                productCategory ,
                packagingMaterial  ,
                packagingMaterialTouching ,
                variation,
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
                createdTime  ,
                CreatedData ,
                status,
                videoPath  ,
                imagePaths })
        // const newProduct = new Product({ videoPath});
        console.log(newProduct)
        await newProduct.save();
       
        return res.status(201).json({success: true, newProduct});

    } catch(error){
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error'});
    }

}
