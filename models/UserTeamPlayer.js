const mongoose = require('mongoose')

const userTeamPlayerSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    user_team_session_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User_Team_Session'
    },
    player_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Players_Fantasy'
    }
})

module.exports = mongoose.model('User_Team', userTeamPlayerSchema)