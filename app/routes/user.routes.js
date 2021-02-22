const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  // Check authentication 
  app.use(authJwt.verifyToken)
  app.get("/users", controller.getAllUsers);
};
