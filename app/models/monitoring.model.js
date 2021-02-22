module.exports = (sequelize, Sequelize) => {
    const Monitor = sequelize.define("monitorings", {
        url: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.NUMERIC
        },
        status: {
            type: Sequelize.STRING
        },
        expectedResponseTime: {
            type: Sequelize.NUMERIC

        }
    });

    return Monitor;
};
