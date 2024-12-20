const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const { CreateEvent, DeleteEvent, getAllEvent, updateEvent, MyEvent, addPeople, cancelPeople } = require('../EventController')
const { verify } = require('jsonwebtoken')
const { middleId, middleURL } = require('../../../middlewares/middlewars')
const router = express.Router()


//Route Event de la personne
router.route('/mine', extractToken).get(MyEvent)
//Route de la création d'event
router.route('/CreateEvent', middleURL, middleId).post(CreateEvent)
//Route de la suppréssion d'event
router.route('/DeleteEvent/:id', middleId).delete(DeleteEvent)
//Route qui affiche tout les Event crées.
router.route('/AllEvent').get(getAllEvent)
//Route pour la modification d'Event.
router.route('/UpdateEvent', middleId).patch(updateEvent)
//Rajout de participant
router.route('/addpeople/:id').put(addPeople)
//Cancel People
router.route('/cancelPeople/:id').patch(cancelPeople)

module.exports = router