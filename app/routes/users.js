const express = require('express')
const router = express.Router()
const serieController = require('../controllers/series_controller')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const jwtSecret = 'abc123cdfg254ad95yh31a4f4hdfdf3sw5er1hgha41dga8dfg9433348dfv'

router.use(async(req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token
  if(token){
    try{
      const decoded = jwt.verify(token, jwtSecret)
      console.log(decoded)
      if(decoded.roles.indexOf('admin') >= 0){
        next()
      }else{
        res.send({ success: false})
      }      
    }catch(e){
      res.send({ success: false })
    }   
  }else{
    res.send({ success: false, message: 'unauthorized'})
  }

})

router.get('/', async(req, res) => {
  const users = await User.find({})
  res.send(users)
})


//router.get('/', serieController.index)
//router.get('/:id', serieController.show)
//router.post('/', serieController.newSerie)
//router.put('/:id', serieController.updateSerie)
//router.delete('/:id', serieController.deleteSerie)

module.exports = router