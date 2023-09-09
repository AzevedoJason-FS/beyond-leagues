const mongoose = require('mongoose')

const fantasyMatchesSchema = new mongoose.Schema({
    match_date:{
        type: Date,
        required: true
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Leagues'
    },
    opponents:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teams'
    }],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams'
    },
    best_of:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Fantasy_Matches', fantasyMatchesSchema)