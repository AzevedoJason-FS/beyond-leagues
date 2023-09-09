const mongoose = require('mongoose')

const fantasyTeamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Leagues'
    },
    salary_cap: {
        type: Number,
    },
    equipment: {
        type: Number
    },
    facilities: {
        type: Number
    },
    fans: {
        type: Number
    }
})

module.exports = mongoose.model('Teams', fantasyTeamsSchema)