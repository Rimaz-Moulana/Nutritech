const RuleService = require('../services/ruleService')

exports.getAllRules = async (req, res) => {
    try {
      const rules = await RuleService.getSensorManagerAllRules();
      res.status(200).json(rules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  exports.postRule= async (req,res)=>{
    try {
          const rule = await RuleService.postRuleDetails(req);
          res.json(rule);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }

  exports.deleteRule= async (req,res)=>{
    
    try {
      const ruleId = req.params.ruleId;
          const rule = await RuleService.deleteRuleDetails(ruleId);
          res.json(rule);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }