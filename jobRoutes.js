const { connectQueue } = require('./config')
const bodyParser = require("body-parser");

const jobOptions = {
    // jobId, uncoment this line if your want unique jobid
    removeOnComplete: true, // remove job if complete
    // delay: 60000, // 1 = 60000 min in ms
    attempts: 3 // attempt if job is error retry 3 times
};

const nameQueue = 'ORDERS-MESSAGE-QUEUE'

const init = async (data) => {
    return await connectQueue(nameQueue).add(data, jobOptions)
}

module.exports = app => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post('/message', async function (req, res) {
        if (req.body.message) {
            const data = {
                message: req.body.message
            }
            console.log("data: ", data.message)
            init(data).then(resdata => {
                console.info(`Job ID ${resdata.id}: "${resdata.data.message}" added to ${resdata.queue.name}`)
                res.send("your message was sent successfully.")
            });
        } else {
            res.send("required message!")
        }

    })

}
