const Teams = require('../models/Teams')
const asyncHandler = require('express-async-handler')

// @desc GET all teams
// @desc GET /teams
// @access Private
const getAllTeams = asyncHandler(async (req,res) => {
    const teams = await Teams.find().lean()
    .populate({ path: 'league', select: ['name','logo','teams','slug']})
    if(!teams?.length){
        return res.status(400).json({ messsage: 'No teams Found' })
    }
    res.json(teams)
})

// @desc POST new team
// @desc POST /teams
// @access Private
const createNewTeam = asyncHandler(async (req,res) => {
    const { name, logo, slug, league } = req.body

    // Confirm data
    if(!name || !logo || !slug || !league){
        return res.status(400).json({ message: 'All Fields Are Required '})
    }

    // Check for duplicate
    const duplicate = await Teams.findOne({ name }).lean().exec()

    if(duplicate){
        return res.status(409).json({ message: 'Duplicate team '})
    }

    const teamObject = { name, logo, slug, league }

    // Create and Store new team
    const team = await Teams.create(teamObject)

    if(team){ //created
        res.status(201).json({ message: `New team ${name} created`})
    } else {
        res.status(400).json({ message: 'Invalid team data received '});
    }
})

// @desc PATCH a team
// @desc PATCH /teams
// @access Private
const updateTeam = asyncHandler(async (req,res) => {
    const { id, name } = req.body

    // Confirm data
    if(!id || !name ){
        return res.status(400).json({ message: 'All fields are required' })
    }

    const team = await Teams.findById(id).exec()

    if(!team){
        return res.status(400).json({ message: 'Team Not Found' })
    }

    // Check for duplicate
    const duplicate = await Teams.findOne({ name }).lean().exec()
    // Allow updates to the original team
    if(duplicate && duplicate?._id.toString()  !== id){
        return res.status(409).json({ message: 'Duplicate team name' })
    }

    team.name = name

    const updatedTeam = await Teams.save()
    
    res.json({ message: `${updatedTeam.name} updated` })
})

// @desc DELETE a team
// @desc DELETE /teams
// @access Private
const deleteTeam = asyncHandler(async (req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'role ID Required' })
    }

    const team = await Teams.findById(id).exec()

    if(!team) {
        return res.status(400).json({ message: 'Team Not Found' })
    }

    const result = await Teams.deleteOne()

    const reply = `name ${result.name} with ID ${result.id} Deleted`

    res.json(reply)
})

module.exports = {
    getAllTeams,
    createNewTeam,
    updateTeam,
    deleteTeam
}