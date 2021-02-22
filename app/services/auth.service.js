const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");


const checkPasswordValidity = async (enteredPassword, actualPassword) => new Promise((resolve, reject) => {
    resolve(bcrypt.compareSync(
        enteredPassword,
        actualPassword)).catch(err => {
            reject(err)
        })
})

const generateToken = async (user) => new Promise((resolve, reject) => {
    resolve(
        jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        })
    ).catch(err => {
        reject(err)
    })
})

module.exports = {
    checkPasswordValidity,
    generateToken

}