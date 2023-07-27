const mongoose = require('mongoose')

const playersFantasychema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Players_Fantasy', playersFantasychema)