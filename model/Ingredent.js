const mongoose = require('mongoose')

const distSchema = new mongoose.Schema({
    dishId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Dish id is required"],
        ref: 'Dish'
    },
    ingredent: {
        type: String,
        required: [true, 'Ingredent name is required'],
        uniquie: true
    }

})
module.exports = Ingredent = mongoose.model('ingredent', distSchema)