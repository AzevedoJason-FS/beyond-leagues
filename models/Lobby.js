const mongoose = require('mongoose')

const LobbySchema = new mongoose.Schema({
    standings: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user_points'
    }],
    active: {
        type: Boolean,
        require: true
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'leagues'
    },
    transfer_list: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Players_Fantasy'
    }],
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Lobby', LobbySchema)