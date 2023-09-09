const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/rolesController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(rolesController.getAllRoles)
    .post(verifyJWT,rolesController.createNewRole)
    .patch(verifyJWT,rolesController.updateRole)
    .delete(verifyJWT,rolesController.deleteRole)

module.exports = router