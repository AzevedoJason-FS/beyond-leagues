const League = require('../models/Leagues')
const asyncHandler = require('express-async-handler')

// @desc GET all Leagues
// @desc GET /Leagues
// @access Private
const getAllLeagues = asyncHandler(async (req,res) => {
    const leagues = await League.find().lean()
    .populate({ path: 'teams', select: ['name','logo','slug']})

    if(!leagues?.length){
        return res.status(400).json({ messsage: 'No Leagues Found' })
    }
    res.json(leagues)
})

// @desc POST new league
// @desc POST /Leagues
// @access Private
const createNewLeague = asyncHandler(async (req,res) => {
    const { name, logo, teams, slug } = req.body

    // Confirm data
    if(!name || !logo || !teams || !slug){
        return res.status(400).json({ message: 'All Fields Are Required '})
    }

    // Check for duplicate
    const duplicate = await League.findOne({ name }).lean().exec()

    if(duplicate){
        return res.status(409).json({ message: 'Duplicate League '})
    }

    const leagueObject = { name, logo, teams, slug }

    // Create and Store new league
    const league = await League.create(leagueObject)

    if(league){ //created
        res.status(201).json({ message: `New league ${name} created`})
    } else {
        res.status(400).json({ message: 'Invalid league data received '});
    }
})

// @desc PATCH a league
// @desc PATCH /Leagues
// @access Private
const updateLeague = asyncHandler(async (req,res) => {
    const { id, name } = req.body

    // Confirm data
    if(!id || !name ){
        return res.status(400).json({ message: 'All fields are required' })
    }

    const league = await League.findById(id).exec()

    if(!league){
        return res.status(400).json({ message: 'league Not Found' })
    }

    // Check for duplicate
    const duplicate = await League.findOne({ name }).lean().exec()
    // Allow updates to the original league
    if(duplicate && duplicate?._id.toString()  !== id){
        return res.status(409).json({ message: 'Duplicate league' })
    }

    league.name = name

    const updatedLeague = await League.save()
    
    res.json({ message: `${updatedLeague.name} updated` })
})

// @desc DELETE a league
// @desc DELETE /Leagues
// @access Private
const deleteLeague = asyncHandler(async (req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'league ID Required' })
    }

    const league = await League.findById(id).exec()

    if(!league) {
        return res.status(400).json({ message: 'league Not Found' })
    }

    const result = await League.deleteOne()

    const reply = `league_name ${result.name} with ID ${result.id} Deleted`

    res.json(reply)
})

module.exports = {
    getAllLeagues,
    createNewLeague,
    updateLeague,
    deleteLeague
}