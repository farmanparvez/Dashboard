const express = require('express')
const router = express.Router()
const ingredentController = require('../controller/dishController')

router.route('/ingredent').post(ingredentController.createIngredent).get(ingredentController.getIngredent)

module.exports = router