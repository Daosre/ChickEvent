const express = require('express')
const { SignUp } = require('../UserController')
const router = express.Router()

router.route('/SignUp').post(SignUp)

module.exports = router 