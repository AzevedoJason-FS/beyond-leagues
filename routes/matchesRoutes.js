const express = require('express')
const router = express.Router()
const matchesController = require('../controllers/matchesController')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', matchesController.getAllMatches)
router.get('/:league', matchesController.getMatchByLeague)
    .post(verifyJWT,matchesController.createNewMatch)
    .patch(verifyJWT,matchesController.updateMatch)
    .delete(verifyJWT,matchesController.deleteMatch)

module.exports = router