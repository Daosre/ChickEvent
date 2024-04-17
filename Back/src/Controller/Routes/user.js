const express = require('express')
const { SignUp, LogIn } = require('../UserController')
const { middleEmail } = require('../../../middlewares/middlewars')
const router = express.Router()

router.route('/SignUp').post(SignUp)
router.route('/LogIn', middleEmail).post(LogIn)


module.exports = router 