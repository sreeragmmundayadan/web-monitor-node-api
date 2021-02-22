const request = require('request')

const db = require("../models");
const Log = db.log



// To add new monitoring log to db
const addLog = async (data, userId) => new Promise((resolve, reject) => {
    Log.create({
        monitoringId: data.id,
        status: data.status,
        expectedResponseTime: data.responseTime,
        responseTime: data.actualResponseTime

    }).then(response => {
        if (response) {
            resolve(response)
        }
    }).catch(err => {
        reject(err)
    })
})

// to get all logs by id
const getAllLogs = async (id) => new Promise((resolve, reject) => {
    Log.findAll({
        where: {
            monitoringId: id
        }
    }).then(logs => {
        resolve(logs);
    }).catch(err => {
        reject(err)
    })
})



module.exports = {
    addLog,
    getAllLogs
}