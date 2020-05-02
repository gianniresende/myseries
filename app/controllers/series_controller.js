const Serie = require('../models/serie')

const index = async(req, res) => {
  const series = await Serie.find({})
  res.send(series)
}

const show = async(req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.send(serie)
}

const newSerie = async(req, res) => {
  const serie = new Serie(req.body)
  try{
    await serie.save()
    res.send(serie)
  }catch(e){
    res.send({
      sucess: false,
      errors: Object.keys(e.errors)
    })
  }
}

const updateSerie = async(req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  serie.name = req.body.name,
  serie.status = req.body.status
  try{
    await serie.save()
    res.send(serie)
  }catch(e){
    res.send({
      sucess: true,
      errors: Object.keys(e.errors)
    })
  }
}

const deleteSerie = async (req, res) => {
  await Serie.remove({ _id: req.params.id })
  res.send({
    success: true
  })
}

module.exports = {
  index, show, newSerie, updateSerie, deleteSerie
}