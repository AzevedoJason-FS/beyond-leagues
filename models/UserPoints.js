const mongoose = require('mongoose')

const userPointsSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    match_date:{
        type: Date,
        required: true
    },
    used_team:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    points:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('User_Daily_Points', userPointsSchema)