const mongoose = require("mongoose");


const RuleSchema = new mongoose.Schema({
    rule : "String",
    ruleNumber : "String",
    addedAt: "String",
    addedIn: "String",
    addedby: "String",
    editAt: "String",
    editIn: "String",
    editBy :"String", 

})

const RuleModel = mongoose.model("rules", RuleSchema);
module.exports = RuleModel;