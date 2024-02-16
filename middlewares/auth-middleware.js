// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const secret = process.env.SECRET;

// const authToken = async (req, res, next) => {
//     if (req.method === "OPTION") { next() }
//     try {
//         const token = req.headers.authorization.split(" ")[1]
//         if (!token) { return res.status(403).json({ message: "User is not authorization" }) }

//         const decodedData = jwt.verify(token, secret);
//         console.log(decodedData);
//         next()
//     }
//     catch {
//         return res.status(403).json({ message: "User is not authorization" })
//     }
// }
// module.exports = { authToken };
const passport = require('passport');
require('../config/config-passport')

const authToken = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized',
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};
module.exports = { authToken };
