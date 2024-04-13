const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const { CreateEvent, getMyEvent } = require('../EventController')
const { verify } = require('jsonwebtoken')
const router = express.Router()


router.route('/mine').post(extractToken)
router.route('/CreateEvent').post(CreateEvent)
router.route('/MyEvent', extractToken).get(getMyEvent)

module.exports = router