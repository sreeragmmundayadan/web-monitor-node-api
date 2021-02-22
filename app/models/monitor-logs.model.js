module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("logs", {
        monitoringId: {
            type: Sequelize.NUMERIC
        },
        status: {
            type: Sequelize.STRING
        },
        responseTime: {
            type: Sequelize.NUMERIC
        },
        expectedResponseTime: {
            type: Sequelize.NUMERIC
        }
    });

    return Log;
};
