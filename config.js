const Bull = require('bull')

const connectQueue = (name) => new Bull(name, 
   // { redis: { port: process.env.REDISPORT, host: process.env.REDISHOST } }
   //{ redis: { port: process.env.redisPort, host: process.env.redisHost, password: process.env.redisPWD } }
   //'redis://flowngin:fl0wng1n@redis-91545-0.cloudclusters.net:19996'
   'redis://127.0.0.1:6379'
)

module.exports = { connectQueue }