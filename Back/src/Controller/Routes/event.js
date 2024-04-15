const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const { CreateEvent, DeleteEvent, getAllEvent, updateEvent } = require('../EventController')
const { verify } = require('jsonwebtoken')
const router = express.Router()



router.route('/mine').post(extractToken)
router.route('/CreateEvent').post(CreateEvent)
router.route('/DeleteEvent').delete(DeleteEvent)
router.route('/AllEvent').get(getAllEvent)
router.route('/UpdateEvent').patch(updateEvent)

module.exports = router