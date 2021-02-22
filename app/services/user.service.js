
const db = require("../models");
const User = db.user;

var bcrypt = require("bcryptjs");

const createUser = async (user) => new Promise((resolve, reject) => {
    User.create({
        username: user.username,
        email: user.email,
        password: bcrypt.hashSync(user.password, 8)
    }).then(user => {
        if (user) {
            resolve(user)
        }
    }).catch(err => {
        reject(err)
    })
})

const findUser = async (user) => new Promise((resolve, reject) => {
    User.findOne({
        where: {
            email: user.email
        }
    }).then(userDetails => {
        if (!userDetails) {
            reject({ message: "User Not found." });
        }
        resolve(userDetails)
    }).catch(err => {
        reject(err)
    })
})

const findUserById = async (id) => new Promise((resolve, reject) => {
    User.findOne({
        where: {
            id: id
        }
    }).then(userDetails => {
        if (!userDetails) {
            reject({ message: "User Not found." });
        }
        resolve(userDetails)
    }).catch(err => {
        reject(err)
    })
})

const findAllUsers = async () => new Promise((resolve, reject) => {
    User.findAll({
    }).then(users => {
        resolve(users);
    }).catch(err => {
        reject(err)
    })
})

module.exports = {
    createUser,
    findUser,
    findAllUsers,
    findUserById
}