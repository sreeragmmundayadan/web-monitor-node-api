const userService = require('../services/user.service')
const authService = require('../services/auth.service')


const signUp = async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
    res.send({ message: "User registered successfully!" })
  }
  catch (err) {
    res.status(401).send({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await userService.findUser(req.body)
    const validity = await authService.checkPasswordValidity(req.body.password, user.password)
    if (!validity) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    const token = await authService.generateToken(user)
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn
}
