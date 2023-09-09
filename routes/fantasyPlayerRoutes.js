const express = require('express')
const router = express.Router()
const fantasyPlayerController = require('../controllers/fantasyPlayerController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(fantasyPlayerController.getAllPlayers)
    router.get('/:objective', fantasyPlayerController.getAllPlayersByOdds)
    .post(verifyJWT,fantasyPlayerController.createNewPlayer)
    .patch('/',fantasyPlayerController.updateWinner)
    .delete(verifyJWT,fantasyPlayerController.deletePlayer)

module.exports = router