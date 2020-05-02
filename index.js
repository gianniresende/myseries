const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/myseries'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise

const series = require('./app/routes/series')

app.use(bodyParser({ extended: true }))
app.use('/series', series)
app.get('/', (req, res) => res.send(series))

mongoose
        .connect(mongo, { useMongoClient: true})
        .then(() =>{
          app.listen(port, ()=> console.log('Listening...'))
        })
        .catch(e => console.log(e))
