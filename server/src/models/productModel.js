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
        energy1: Number, 
        energy2 : Number, //per 100g
        protein1 : Number,
        protein2 : Number,//per 100g
        totalFat1: Number,
        totalFat2 : Number, //per 100g
        SFA1: Number,
        SFA2 : Number, //per 100g
        carbo1 : Number,
        carbo2: Number,
        sugar1: Number,
        sugar2: Number,
        salt1 : Number,
        salt2 : Number,
        sodium1 : Number,
        sodium2 : Number,
        transFat1 : Number,
        transFat2 : Number, //per 100g
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
