const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/sign-up", [verifySignUp.checkDuplicateUsernameOrEmail,], controller.signUp);
  app.post("/sign-in", controller.signIn);
};
