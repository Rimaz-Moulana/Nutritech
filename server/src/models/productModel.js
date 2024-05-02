const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
        brand : String,
        productName: String,
        description: String,
        parentCompany: String,
        productCategory: String,
        packagingMaterial : String,
        packagingMaterialTouching: String,
        variation: String,
        countryProduct: String,
        servingSize: String,
        sugarType: String,
        lactose : String,
        vitamin: String,
        mineral: String,
        omega: String,
        acids: String,
        probiotics: String,
        method : String,
        total: String,
        remarks : String,
        ingredients : String,
        energy1: String, 
        energy2 : String, //per 100g
        protein1 : String,
        protein2 : String,//per 100g
        totalFat1: String,
        totalFat2 : String, //per 100g
        SFA1: String,
        SFA2 : String, //per 100g
        carbo1 : String,
        carbo2: String,
        sugar1: String,
        sugar2: String,
        salt1 : String,
        salt2 : String,
        sodium1 : String,
        sodium2 : String,
        transFat1 : String,
        transFat2 : String, //per 100g
        ash1 : String,
        ash2 : String,
        WPROfoodcode : String,
        WPROPermitted : String,
        WPROPermittedRemark : String,
        SEAROfoodcode : String,
        SEAROpermitted: String,
        SEAROpermittedRemark : String,
        SLfoodCode: String,
        SLpermitted: String,
        SLfoodcodePermittedRemark: String,
        createdTime: String,
        CreatedData : String,
        videoPath: String,
        status: String,
        imageFront: String,
        imageBack: String,
        imageLeft: String,
        imageRight: String,
        uploader : String,
        healthfact: String,
        
})


const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
