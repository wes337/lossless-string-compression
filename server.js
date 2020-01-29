const express = require('express')
const algorithm = require('./algorithm')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.text({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.post('/compress', async (req, res) => {
    try {
        if (req.get('Content-Type') !== 'text/plain') {
            res.status(415).send('Unsupported Media Type')
        }
        const body = req.body
        const responseString = body.toString().replace(/\r/g, '')
        const responseArray = responseString.split(/\n/)
        const response = algorithm.compress(responseArray)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/decompress', async (req, res) => {
    try {
        if (req.get('Content-Type') !== 'text/plain') {
            res.status(415).send('Unsupported Media Type')
        }
        const responseString = req.body.toString().replace(/\r/g, '')
        const responseArray = responseString.split(/\n/)
        const response = algorithm.deCompress(responseArray)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port)
console.log('Server started on: ' + port)
