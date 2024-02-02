const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

// router.get('/users', (req,res) => {
//     res.json({msg:"get all users"})
// });

router.get('/users/:id', userController.getUser);

router.post('/upload',)



module.exports = router;