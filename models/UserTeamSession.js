const mongoose = require('mongoose')

const userTeamSessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    lobby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'lobby'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teams'
    },
    team_schedule: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Matches'
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User_Team_Session', userTeamSessionSchema)