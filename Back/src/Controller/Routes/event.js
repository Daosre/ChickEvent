const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const { CreateEvent, DeleteEvent, getAllEvent, updateEvent } = require('../EventController')
const { verify } = require('jsonwebtoken')
const { middleId, middleURL } = require('../../../middlewares/middlewars')
const router = express.Router()



router.route('/mine').post(extractToken)
router.route('/CreateEvent', middleURL).post(CreateEvent)
router.route('/DeleteEvent', middleId).delete(DeleteEvent)
router.route('/AllEvent').get(getAllEvent)
router.route('/UpdateEvent', middleId).patch(updateEvent)

module.exports = router