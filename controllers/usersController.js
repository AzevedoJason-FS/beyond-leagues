const User = require('../models/User')
const UserTeam = require('../models/UserTeam')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc GET all users
// @desc GET /users
// @access Private
const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({ messsage: 'No Users Found' })
    }
    res.json(users)
})

// @desc POST new user
// @desc POST /users
// @access Private
const createNewUser = asyncHandler(async (req,res) => {
    const { email, username, password, roles, country } = req.body

    // Confirm data
    if(!email || !username || !password || !country || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({ message: 'All Fields Are Required '})
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate){
        return res.status(409).json({ message: 'Duplicate Username '})
    }

    // Hash Password
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = { email, username, "password": hashedPwd, roles, country}

    // Create and Store new user
    const user = await User.create(userObject)

    if(user){ //created
        res.status(201).json({ message: `New user ${username} created`})
    } else {
        res.status(400).json({ message: 'Invalid user data received '});
    }
})

// @desc PATCH a user
// @desc PATCH /users
// @access Private
const updateUser = asyncHandler(async (req,res) => {
    const { id, email, username, roles, active, password } = req.body

    // Confirm data
    if(!id || !email || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({ message: 'User Not Found' })
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    // Allow updates to the original user
    if(duplicate && duplicate?._id.toString()  !== id){
        return res.status(409).json({ message: 'Duplicate Username' })
    }

    user.email = email
    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        //Hash Password
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await User.save()
    
    res.json({ message: `${updateUser.username} updated` })
})

// @desc DELETE a user
// @desc DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const user = await findById(id).exec()

    if(!user) {
        return res.status(400).json({ message: 'User Not Found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result.id} Deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}