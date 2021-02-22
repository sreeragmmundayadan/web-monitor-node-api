const request = require('request')

const db = require("../models");
const Monitoring = db.monitoring;
const Log = db.log

// To varify the url exist or not 
const varifyUrl = async (url) => new Promise((resolve, reject) => {
    request.get({
        url: url,
        time: true
    }, (err, response) => {
        if (response) {
            resolve(false)
        } else {
            reject("url not exist")
        }
    });
})


// To add new monitoring to db
const addMonitoring = async (data, userId) => new Promise((resolve, reject) => {
    Monitoring.create({
        url: data.url,
        userId: userId,
        status: "active",
        expectedResponseTime: data.responseTime

    }).then(response => {
        if (response) {
            resolve(response)
        }
    }).catch(err => {
        reject(err)
    })
})

// To check the url is already monitoring or not 
const checkAvailbility = async (data, userId) => new Promise((resolve, reject) => {
    Monitoring.findOne({
        where: {
            url: data.url,
            userId: userId,
            status: "active",
            expectedResponseTime: data.responseTime

        }
    }).then(monitoring => {
        if (monitoring) {
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch(err => {
        reject(err)
    })
})

// to get all active urls for monitoring 
const getAllActiveMonitorings = async () => new Promise((resolve, reject) => {
    Monitoring.findAll({
        where: {
            status: "active"
        }
    }).then(monitorings => {
        resolve(monitorings);
    }).catch(err => {
        reject(err)
    })
})

// to monitor uls
const monitor = async (url) => new Promise((resolve, reject) => {
    request.get({
        url: url,
        time: true
    }, (err, response) => {
        if (response) {
            resolve(response.elapsedTime)
        } else {
            reject(err)
        }
    });
})

// To get the history of user
const history = async (userId) => new Promise((resolve, reject) => {
    Monitoring.findAll({
        where: {
            userId: userId
        }
    }).then(monitorings => {
        resolve(monitorings);
    }).catch(err => {
        reject(err)
    })
})

// to get all active urls monitoring of a user 
const getAllActiveMonitoringsByuserId = async (userId) => new Promise((resolve, reject) => {
    Monitoring.findAll({
        where: {
            status: "active",
            userId: userId
        }
    }).then(monitorings => {
        resolve(monitorings);
    }).catch(err => {
        reject(err)
    })
})

module.exports = {
    varifyUrl,
    addMonitoring,
    checkAvailbility,
    getAllActiveMonitorings,
    monitor,
    history,
    getAllActiveMonitoringsByuserId
}