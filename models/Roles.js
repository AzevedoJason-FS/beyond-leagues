const mongoose = require('mongoose')

const RolesSchema = new mongoose.Schema({
    role_name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Roles', RolesSchema)