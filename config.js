const Bull = require('bull')

const connectQueue = (name) => new Bull(name, { 
    redis: { port: process.env.REDISPORT, host: process.env.REDISHOST } 
})

module.exports = { connectQueue }