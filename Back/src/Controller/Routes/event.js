const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const { CreateEvent, getMyEvent } = require('../EventController')
const { verify } = require('jsonwebtoken')
const router = express.Router()



router.route('/mine').post(extractToken)
router.route('/CreateEvent').post(CreateEvent)


module.exports = router