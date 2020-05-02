const express = require('express')
const router = express.Router()
const serieController = require('../controllers/series_controller')

router.get('/', serieController.index)
router.get('/:id', serieController.show)
router.post('/', serieController.newSerie)
router.put('/:id', serieController.updateSerie)
router.delete('/:id', serieController.deleteSerie)

module.exports = router