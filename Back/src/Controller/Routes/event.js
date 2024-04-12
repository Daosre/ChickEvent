const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const { CreateEvent, getMyEvent } = require('../EventController')
const router = express.Router()

router.route('/mine', extractToken)
router.route('/CreateEvent', CreateEvent)
router.route('/MyEvent', getMyEvent)