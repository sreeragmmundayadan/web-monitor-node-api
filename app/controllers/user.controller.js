const userSerice = require('../services/user.service')

const getAllUsers = async (req, res) => {
    try {
        const users = await userSerice.findAllUsers();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


module.exports = {
    getAllUsers
};