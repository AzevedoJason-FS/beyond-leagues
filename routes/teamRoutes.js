const express = require('express')
const router = express.Router()
const teamsController = require('../controllers/teamsController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(teamsController.getAllTeams)
    .post(verifyJWT,teamsController.createNewTeam)
    .patch(verifyJWT,teamsController.updateTeam)
    .delete(verifyJWT,teamsController.deleteTeam)

module.exports = router