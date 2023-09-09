const mongoose = require('mongoose')

const fantasyLeaguesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teams'
    }],
    slug: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Leagues', fantasyLeaguesSchema)