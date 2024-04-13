const express = require('express')
const { SignUp, LogIn } = require('../UserController')
const router = express.Router()

router.route('/SignUp').post(SignUp)
router.route('/LogIn').post(LogIn)


module.exports = router 