const { handlerFailure, handlerCompleted, handlerStalled } = require('./handler')
const { connectQueue } = require('./config')
const path = require('path')

const nameQueue = 'ORDER-QUEUE1'
const cases = connectQueue(nameQueue)

const processJob = (job, done) => {
    try {
        console.info(`Picked up and working on Job ID ${job.id}`)
        // working on the job
        //setTimeout(()=>{
            done(null, 'succes');
        //}, 5000)
    } catch (error) {
        done(null, error)
    }
}

const initJob = () => {
    console.info(`Worker is on ${nameQueue}!`);
    cases.process(processJob);
    cases.on('failed', handlerFailure);
    cases.on('completed', handlerCompleted);
    cases.on('stalled', handlerStalled);
}

initJob()