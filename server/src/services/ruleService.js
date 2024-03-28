const RuleModel = require('../models/ruleModel')

exports.getSensorManagerAllRules = async (req, res) => {
    try {
      const rules = await RuleModel.find();
    //   console.log(rules)
      return rules;   
    } catch (error) {
      console.error('Error fetching rules:', error);
      throw error; // Rethrow the error to propagate it to the calling function
    }
  };
  
  
  exports.postRuleDetails = async(req)=>{
    return await RuleModel.create(req.body)
}

exports.deleteRuleDetails = async (ruleId) => {
    try {
        const deletedRule = await RuleModel.findOneAndDelete({ _id: ruleId });
        return deletedRule;
    } catch (error) {
        console.error(`Error deleting rule: ${error.message}`);
        throw error;
    }
};
