const express = require('express')
const router = express.Router()
const dishController = require('../controller/dishController')

router.route('/dish').post(dishController.createDish).get(dishController.getDish)
router.route('/dish/:id').get(dishController.getDishById).post(dishController.getDishBySearch)

module.exports = router