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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teams'
    },
    slug:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    odds: {
        type: Number,
        required: true
    },
    odds_obj: {
        type: String,
        required: true
    },
    multiplier_over:{
        type: String,
        required: true
    },
    multiplier_under:{
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    winner: {
        type: Number
    }
})

module.exports = mongoose.model('Players_Fantasy', playersFantasychema)