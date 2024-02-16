const express = require("express");

const router = express.Router();

const { listUser } = require("../controllers/list-controller");

const { authToken } = require("../middlewares/auth-middleware");

router.get('/list', authToken, listUser);


module.exports = router;