const Roles = require('../models/Roles')
const asyncHandler = require('express-async-handler')

// @desc GET all roles
// @desc GET /roles
// @access Private
const getAllRoles = asyncHandler(async (req,res) => {
    const roles = await Roles.find().lean()
    if(!roles?.length){
        return res.status(400).json({ messsage: 'No roles Found' })
    }
    res.json(roles)
})

// @desc POST new role
// @desc POST /roles
// @access Private
const createNewRole = asyncHandler(async (req,res) => {
    const { role_name, slug } = req.body

    // Confirm data
    if(!role_name || !slug){
        return res.status(400).json({ message: 'All Fields Are Required '})
    }

    // Check for duplicate
    const duplicate = await Roles.findOne({ role_name }).lean().exec()

    if(duplicate){
        return res.status(409).json({ message: 'Duplicate role '})
    }

    const roleObject = { role_name, slug }

    // Create and Store new role
    const role = await Roles.create(roleObject)

    if(role){ //created
        res.status(201).json({ message: `New role ${role_name} created`})
    } else {
        res.status(400).json({ message: 'Invalid role data received '});
    }
})

// @desc PATCH a role
// @desc PATCH /roles
// @access Private
const updateRole = asyncHandler(async (req,res) => {
    const { id, role_name } = req.body

    // Confirm data
    if(!id || !role_name ){
        return res.status(400).json({ message: 'All fields are required' })
    }

    const role = await Roles.findById(id).exec()

    if(!role){
        return res.status(400).json({ message: 'Role Not Found' })
    }

    // Check for duplicate
    const duplicate = await Roles.findOne({ role_name }).lean().exec()
    // Allow updates to the original role
    if(duplicate && duplicate?._id.toString()  !== id){
        return res.status(409).json({ message: 'Duplicate role_name' })
    }

    role.role_name = role_name

    const updatedRole = await Roles.save()
    
    res.json({ message: `${updatedRole.role_name} updated` })
})

// @desc DELETE a role
// @desc DELETE /roles
// @access Private
const deleteRole = asyncHandler(async (req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'role ID Required' })
    }

    const role = await Roles.findById(id).exec()

    if(!role) {
        return res.status(400).json({ message: 'role Not Found' })
    }

    const result = await Roles.deleteOne()

    const reply = `role_name ${result.role_name} with ID ${result.id} Deleted`

    res.json(reply)
})

module.exports = {
    getAllRoles,
    createNewRole,
    updateRole,
    deleteRole
}