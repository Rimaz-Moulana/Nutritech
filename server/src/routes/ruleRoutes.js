const express = require('express');
const RuleController = require('../controllers/ruleController');
const router = express.Router();

router.get('/rules', RuleController.getAllRules);
router.post('/rules', RuleController.postRule);
router.delete('/rules/:ruleId', RuleController.deleteRule);

module.exports = router;