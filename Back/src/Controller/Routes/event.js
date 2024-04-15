const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const { CreateEvent, DeleteEvent } = require('../EventController')
const { verify } = require('jsonwebtoken')
const router = express.Router()



router.route('/mine').post(extractToken)
router.route('/CreateEvent').post(CreateEvent)
router.route('/DeleteEvent/:id').delete(DeleteEvent)


module.exports = router