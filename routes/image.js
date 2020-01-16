const router = require('express').Router()
const ImageController = require('../controllers/imageController')

router.post('/transform', ImageController.textToImage)

module.exports = router