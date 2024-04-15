const { Event }= require('../Model/Event')
const client = require('../Services/Connexion')
const { ObjectId } = require('bson')
//On r'apelle le Token / Jwt
const { extracToken } = require('../Utils/extractToken')
const jwt = require('jsonwebtoken')
//Ne pas oublier le requrie du fichier .env
require('dotenv').config()


//Création des Events
const CreateEvent = async (req,res) => {
    if(
        !req.body.title ||
        !req.body.description ||
        !req.body.image ||
        !req.body.category ||
        !req.body.userId 
    ) 
    //Si toute les conditions ci-dessus ne sont pas respecter:
    {
        res.status(400).json({ error: "Veuillez précisez les champs vides"})
    }

    try {
        let Evènement = new Event(
            req.body.title,
            req.body.description,
            req.body.image,
            req.body.category,
            req.body.userId,
            new Date(),
            'published'
        )
        //L'endroit ou vas être ranger dans la BDD
        let result = await client
        .db('ChickEvent')
        .collection('EventChicken')
        .insertOne(Evènement)
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({ error: "t'es ici"})
    }
}
//Récupération de tout les Events crée.
const getAllEvent = async (req, res) => {
    let ToutEvents = await client.db('ChickEvent').collection('EventChicken').find()
    let apiReponse = await ToutEvents.toArray()
    res.status(200).json(apiReponse)
}

const updateEvent = async (req,res) => {
    //Validateur pour l'update
    if(
        !request.body.title ||
        !request.body.description ||
        !request.body.price ||
        !request.body.image ||
        !request.body.userId
    ) {
        res.status(400).json({ error: 'Manque des trucs.'})
    }
    let user = await client
    .db('ChickEvent')
    .collection('EventChicken')
    .find({ _id: req.body.userId })

    if(!user || !Event) {
        res.status(401).json({ error: 'Non autorisé'})
        return
    }
    if (Event.userId !== user._id || user.role !== 'admin') {
        res.status(401).json({ error: 'TA MERE'})
        return
    }
}
//Suppréssion d'un Event
const DeleteEvent = async (req, res) => {
    if(!req.body.userId || !req.params.EventId) {
        res.status(400).json({ error: 'Ta pas le droit de faire ça.'})
        console.log(req.params.EventId)
        return
    }
    let EventId = new ObjectId(req.params.EventId)
    let userId = new ObjectId(req.body.userId)

    let user = await client
    .db('ChickEvent')
    .collection('ChickenUser')
    .findOne({ _id: userId })

    let Event = await client
    .db('ChickEvent')
    .collection('EventChicken')
    .findOne({ _id: EventId })
    console.log(Event)
    
    //Si le userId ne conrespond pas avec l'EventId alors tu me met une erreur.
    if(!user || !Event) {
        res.status(401).json({ error: "T'es pas autoriser va voir la-bas"})
        return
    }
    if(Event.userId !== user._id && user.role !== "admin") {
        res.status(401).json({ error: "T'es pas autoriser va voir ailleurs"})
        return
    } {
        res.status(200).json({msg:'supr ok'})
    }
    try {
        await client
        .db('ChickEvent')
        .collection('EventChicken')
        .deleteOne({ _id: EventId})
    } catch (e) {
        res.status(500).json(e)
    }
}


module.exports = { CreateEvent, getAllEvent, DeleteEvent }