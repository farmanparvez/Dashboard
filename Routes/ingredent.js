const express = require('express')
const router = express.Router()
const ingredentController = require('../controller/ingredentController')

router.route('/ingredent').post(ingredentController.createIngredent)
router.route('/ingredent/:id').get(ingredentController.getIngredent)

module.exports = router