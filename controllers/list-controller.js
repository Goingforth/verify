const User = require('../models/user');

const listUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        next(error);
    }



};


module.exports = {
    listUser
}