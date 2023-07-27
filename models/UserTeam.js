const mongoose = require('mongoose')

const userTeamSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    user_team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players_Fantasy'
    }],
    total_point:{
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('User_Team', userTeamSchema)