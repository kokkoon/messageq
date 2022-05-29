const Bull = require('bull');
const bodyParser = require("body-parser");

const jobOptions = {
    // jobId, uncoment this line if your want unique jobid
    removeOnComplete: true, // remove job if complete
    // delay: 60000, // 1 = 60000 min in ms
    attempts: 3 // attempt if job is error retry 3 times
};

const connectQueue = (name) => new Bull(name, { 
    redis: { port: process.env.REDISPORT, host: process.env.REDISHOST } 
});

const nameQueue = 'ORDERS-MESSAGE-QUEUE'

const init = async (data) => {
    return await connectQueue(nameQueue).add(data, jobOptions)
}

module.exports = {
    init
}