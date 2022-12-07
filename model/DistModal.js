const mongoose = require('mongoose')

const distSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: [true, 'Dish name is required'],
        uniquie: true
    }

})
module.exports = Dish = mongoose.model('Dish', distSchema)