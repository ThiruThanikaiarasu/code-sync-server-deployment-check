const express = require('express')
const router = express.Router()

const {addNewUser, } = require('../controller/signupController')


router.route('/').post(addNewUser)

module.exports = router