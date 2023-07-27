const mongoose = require('mongoose')

const playerStatsSchema = new mongoose.Schema({
    player_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Players_Fantasy'
    },
    kills:{
        type: Number,
        required: true
    },
    deaths:{
        type: Number,
        required: true
    },
    assists:{
        type: Number,
        required: true
    },
    points:{
        type: Number,
        required: true
    },
    match_date:{
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Player_Stats', playerStatsSchema)