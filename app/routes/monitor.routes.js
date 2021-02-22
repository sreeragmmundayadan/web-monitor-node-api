const controller = require("../controllers/monitor.control");
const { authJwt } = require("../middleware");


module.exports = function (app) {
    // Check authentication 
    app.use(authJwt.verifyToken)
    app.post("/monitor", controller.monitor);
    app.get("/history", controller.history);
    app.get("/monitor", controller.getActiveMonitoringByUserId);
    app.get("/logs/:id", controller.getLogsById);


};