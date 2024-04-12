const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const { CreateEvent } = require('../EventController')
const router = express.Router()

router.route('/mine', extractToken)
router.route('/CreateEvent', CreateEvent)