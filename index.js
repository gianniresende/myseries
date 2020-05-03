const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/myseries'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const jwtSecret = 'abc123cdfg254ad95yh31a4f4hdfdf3sw5er1hgha41dga8dfg9433348dfv'

const User = require('./app/models/user')

mongoose.Promise = global.Promise

const series = require('./app/routes/series')
const users = require('./app/routes/users')

app.use(bodyParser.json())
app.use('/series', series)
app.use('/users', users)
app.get('/', (req, res) => res.send(series))

app.post('/auth', async(req, res) => {
  const user = req.body
  const userDb = await User.findOne({ username: user.username })
  if(userDb){
    if(userDb.password === user.password){
      const payload = {
        id: userDb._id,
        username: userDb.username,
        roles: userDb.roles
      }
      jwt.sign(payload, jwtSecret, (err, token ) => {
        res.send({
          sucess: true,
          token: token
        })
      })      
      
    }else{
      res.send({ sucess: false, message: 'wrong credentials' })
    }
  }else{
    res.send({ sucess: false, message: 'wrong credentials' })
  }
})

const createInitialUser = async() => {
  const total = await User.countDocuments({})
  if(total === 0) {
    const user = new User({
      username: 'Gianni',
      password: '123456',
      roles: ['restrito', 'admin']
    })
    await user.save()

    const user2 = new User({
      username: 'Alex',
      password: '123456',
      roles: ['user']
    })
    await user2.save()
  }
}

mongoose
        .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() =>{
          createInitialUser()
          app.listen(port, ()=> console.log('Listening...'))
        })
        .catch(e => console.log(e))
