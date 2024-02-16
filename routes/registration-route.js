const express = require("express");

const router = express.Router();
const { check } = require('express-validator');


const { registrationUser } = require("../controllers/registration-controller");

router.post('/registration', [check("username", "login is not empty").notEmpty(),
check("password", "lenght should be from 4 to 10").isByteLength(min = 4, max = 10),
check("email", "email is not email").isEmail()
], registrationUser);

module.exports = router;