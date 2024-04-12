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

const getMyEvent = async (req, res) => {
    const token = await extracToken(req)
    jwt.verify(
        token,
        process.env.MA_SECRETKEY,
        async (err, authData) => {
            if (err) {
                console.log(err)
                res.status(401).json({ err: 'Unautorizhed' })
                return
            } else {
                let Events = await client
                .db('ChickenEvent')
                .collection('EventChicken')
                .find({ userId: authData.id })
            let apiResponse = await Events.toArray()
            res.status(200).json(apiResponse)
            }
        }
    ) 
}

module.exports = { CreateEvent, getMyEvent }