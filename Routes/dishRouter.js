const express = require('express')
const router = express.Router()
const dishController = require('../controller/dishController')

router.route('/dish').post(dishController.createDish).get(dishController.getDish)

module.exports = router