const { connectQueue } = require('./config')
const nameQueue = 'ORDERS-MESSAGE-QUEUE'
const cases = connectQueue(nameQueue)

const handlerCompleted = (job) => {
    //console.log("\n======================================================================")
    console.info(`Job ID ${job.id}: "${job.data.message}" in ${job.queue.name} is done.`)
    //console.log("======================================================================")
    //cases.getJobCounts().then(res => console.log('Job Count:\n', res));
    //cases.getJobs('completed').then(res => console.log('Job completed:\n', res));
    //cases.getJobs('waiting').then(res => console.log('Job completed:\n', res));
    // cases.getJobs('failed').then(res => console.log('Job completed:\n',res));

    job.remove()
}

const handlerFailure = (job, err) => {
    if (job.attemptsMade >= job.opts.attempts) {
        console.info(`Job failures above threshold in ${job.queue.name} for: ${job.id}`, err)
        return null
    }
    console.info(`Job in ${job.queue.name} failed for: ${job.id} with ${err.message}. ${job.opts.attempts - job.attemptsMade} attempts left`)
}

const handlerStalled = (job) => {
    console.info(`Job in ${job.queue.name} stalled for: ${job.id}`)
}

module.exports = {
    handlerCompleted, handlerFailure, handlerStalled
}