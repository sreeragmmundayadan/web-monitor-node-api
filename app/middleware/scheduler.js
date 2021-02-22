const cron = require('node-cron');

const monitorService = require('../services/monitor.service')
const logService = require('../services/monitor-log.service')



const schedule = async () => {
    cron.schedule('0 */5 * * * *', async () => {
        const activeMonitorings = await monitorService.getAllActiveMonitorings()
        if (activeMonitorings.length > 0) {
            activeMonitorings.forEach(async (monitoring) => {
                try {
                    const responseTime = await monitorService.monitor(monitoring.url)
                    console.log(responseTime);
                    console.log(monitoring.expectedResponseTime);
                    if (responseTime > monitoring.expectedResponseTime) {
                        data = {
                            id: monitoring.id,
                            status: "active",
                            responseTime: monitoring.expectedResponseTime,
                            actualResponseTime: responseTime
                        }
                        const log = await logService.addLog(data)

                    }
                } catch (err) {
                    data = {
                        id: monitoring.id,
                        status: "404",
                        responseTime: monitoring.expectedResponseTime
                    }

                    const log = await logService.addLog(data)

                    console.log('error');
                }

            });
        }
    });
};

module.exports = () => {
    schedule();
};
