const express = require('express')
const router = express.Router()
const leaguesController = require('../controllers/leaguesController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(leaguesController.getAllLeagues)
    .post(verifyJWT,leaguesController.createNewLeague)
    .patch(verifyJWT,leaguesController.updateLeague)
    .delete(verifyJWT,leaguesController.deleteLeague)

module.exports = router