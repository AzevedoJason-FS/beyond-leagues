const express = require('express')
const router = express.Router()
const betsController = require('../controllers/userBetController')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/:id', betsController.getAllBetsById)
router.post('/award', betsController.award)
    .post('/', betsController.createNewBet)
    // .patch(verifyJWT,matchesController.updateMatch)
    // .delete(verifyJWT,matchesController.deleteMatch)

module.exports = router