const User = require('../models/user');
const { validationResult } = require('express-validator');

const registrationUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ message: "Error validation", errors }) }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict',
        });
    }
    try {
        const newUser = new User({ username, email, password });
        newUser.setPassword(password);
        await newUser.save();
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                message: 'Registration successful',
            },
        });
    } catch (error) {
        next(error);
    }

};

module.exports = {
    registrationUser
}