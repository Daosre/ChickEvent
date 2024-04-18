const express = require('express')
const { SignUp, LogIn } = require('../UserController')
const { middleEmail } = require('../../../middlewares/middlewars')
const router = express.Router()

//Route pour l'inscription au site
router.route('/SignUp').post(SignUp)

//Route pour la connexion au site
router.route('/LogIn', middleEmail).post(LogIn)


module.exports = router 