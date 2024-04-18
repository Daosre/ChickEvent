const { Event }= require('../Model/Event')
const client = require('../Services/Connexion')
const { ObjectId } = require('bson')
const { extractToken } = require('../Utils/extractToken')
const jwt = require('jsonwebtoken')
//Ne pas oublier le requrie du fichier .env
require('dotenv').config()


//Création des Events
const CreateEvent = async (req,res) => {
    const token = await extractToken(req)
    jwt.verify(
        token,
        process.env.MA_SECRETKEY,
        async (err, authData) => {
            if (err) {
                res.status(401).json({ err: 'Unauthorized' })
                return
            } else {
    if(
        !req.body.title ||
        !req.body.description ||
        !req.body.image ||
        !req.body.category
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
            authData.id,
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
        }
    )
}
//Récupération de tout les Events crée.
const getAllEvent = async (req, res) => {
    let ToutEvents = await client.db('ChickEvent').collection('EventChicken').find()
    let apiReponse = await ToutEvents.toArray()
    res.status(200).json(apiReponse)
}
//Update d'un Event
const updateEvent = async (req,res) => {
    //Validateur pour l'update
    if(
        !req.body.title ||
        !req.body.description ||
        !req.body.image ||
        !req.body.category ||
        !req.body.userId
    ) {
        res.status(400).json({ error: 'Manque des trucs.'})
    }   
    let EventId = new ObjectId(req.body.EventId)
    let userId = new ObjectId(req.body.userId)
    let user = await client
    .db('ChickEvent')
    .collection('ChickenUser')
    .find({ _id: userId })

    let Events = await client
    .db('ChickEvent')
    .collection('EventChicken')
    .find({ _id : EventId})
    if(!user || !Events) {
        res.status(401).json({ error: 'Non autorisé'})
        return
    }
    if (Events.userId !== user._id && user.role !== 'admin') {
        res.status(401).json({ error: 'Non'})
        return
    }
    try {
        await client
            .db('ChickEvent')
            .collection('EventChicken')
            .updateOne(
                { _id: EventId },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        image: req.body.image,
                        category: req.body.category
                    }, 
                } 
            )
    } catch (e) {
        res.status(500).json(e)
    } 
    res.status(200).json({msg: "Updated"})    
}
//Suppréssion d'un Event
const DeleteEvent = async (req,res) => {
    const token = await extractToken(req)
    jwt.verify(
        token,
        process.env.MA_SECRETKEY,
        async (err, authData) => {
            if (err) {
                res.status(401).json({ err: 'Unauthorized' })
                return
            } else {
                if(!req.params.id) {
                    res.status(400).send("Need a ID")
                }
                let id = new ObjectId(req.params.id)

                let Eventdel = await client
                .db('ChickEvent')
                .collection('EventChicken')
                .deleteOne({ _id: id })
                let response = await Eventdel

                if(response.deletedCount === 1) {
                    res.status(200).json({ msg: 'Deleted' })
                } else {
                    res.status(204).json({ msg: 'Nothing here'})
                }
            }
        }
    )
}
//Affichage des Events de la personne connecter.
const MyEvent = async (req, res) => {
    const token = await extractToken(req)

    jwt.verify(
        token,
        process.env.MA_SECRETKEY,
        async (err, authData) => {
            if (err) {
                res.status(401).json({ err: 'Unauthorized' })
                return
            } else {
                let Event = await client
                    .db('ChickEvent')
                    .collection('EventChicken')
                    .find({ userId: authData.id })
                let apiResponse = await Event.toArray()
                res.status(200).json(apiResponse)
            }
        }
    )
}

module.exports = { CreateEvent, getAllEvent, DeleteEvent, updateEvent, MyEvent }