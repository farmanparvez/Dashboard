const mongoose = require('mongoose')

const distSchema = new mongoose.Schema({
    ingredent: {
        type: String,
        required: [true, 'Ingredent name is required'],
        uniquie: true
    }

})
module.exports = Ingredent = mongoose.model('ingredent', distSchema)