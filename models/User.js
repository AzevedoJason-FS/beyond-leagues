const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "User"
    }],
    active: {
        type: Boolean,
        default: true
    },
    country: {
        type: String,
        required: true
    },
    money: {
        type: String,
    },
    bets:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Bets'
    }]
})

module.exports = mongoose.model('User', userSchema)