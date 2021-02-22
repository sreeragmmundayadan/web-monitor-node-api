const authJwt = require("./authJWT");
const verifySignUp = require("./varifySignUP");
const schedule = require('./scheduler')

module.exports = {
    authJwt,
    verifySignUp,
    schedule
};