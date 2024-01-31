const userService = require('../services/userService');

exports.getUser = async (req,res) => {
    try{
        const userId = req.params.id;
        const user = await userService.getUserIdMongo(userId);
        res.json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }

};

exports.postUser = (req,res) =>{
        
}
