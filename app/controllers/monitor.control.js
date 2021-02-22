const monitorService = require('../services/monitor.service')
const logService = require('../services/monitor-log.service')


const monitor = async (req, res) => {
    try {
        const url = req.body.url
        const urlExist = await monitorService.varifyUrl(url)
        if (!urlExist) {
            const availbility = await monitorService.checkAvailbility(req.body, req.user.id)
            if (!availbility) {
                const addMonitoringURL = await monitorService.addMonitoring(req.body, req.user.id)
                res.status(200).send({ message: addMonitoringURL.url + "url started monitoring" })
            } else {
                res.status(500).send({ message: "url already monitoring" })

            }
        }
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const history = async (req, res) => {
    try {
        const id = req.user.id
        const history = await monitorService.history(id)
        res.status(200).send(history)
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

// get all active monitorings by user
const getActiveMonitoringByUserId = async (req, res) => {
    try {
        const id = req.user.id
        const monitorings = await monitorService.getAllActiveMonitoringsByuserId(id)
        res.status(200).send(monitorings)
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

// get all active monitorings by user
const getLogsById = async (req, res) => {
    try {
        const id = req.params.id
        const logs = await logService.getAllLogs(id)
        res.status(200).send(logs)
    } catch (err) {
        res.status(500).send({ message: err });
    }
};



module.exports = {
    monitor,
    history,
    getActiveMonitoringByUserId,
    getLogsById
};