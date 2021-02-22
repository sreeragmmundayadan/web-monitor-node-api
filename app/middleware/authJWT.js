const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const userService = require('../services/user.service')

verifyToken = (req, res, next) => {
    let token = req.headers.authorization || '';
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        try {
            const user = await userService.findUserById(decoded.id)
            req.user = user;
            next();
        } catch (err) {
            return res.status(401).send({
                message: err.message
            });
        }
    });
};


const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;