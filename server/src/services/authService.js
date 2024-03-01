const User = require('../models/user')

exports.register = async (email, password) => {
    const {username, email, password, role}= userData;
    const user = new User({
        username, email, password, role
    })
    await user.save();
}

exports.login = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('User not found');
    }






    return user;
}