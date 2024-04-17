const { User } = require('../Model/User')
const client = require('../Services/Connexion')
const bcrypt = require('bcrypt')
const { ObjectId } = require('bson')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const SignUp = async (req,res) => {
    //Si lors de l'enregistrement tout est bien respecter
    if( 
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password
    )
    //Si un des champs est pas bon met ce message d'erreur
     {
        res.status(400).json({ error: 'Y manque quelque chose..'})
    }
    //Combien de fois je veux que le mot de passe sois hasher.
    const passwordhash = await bcrypt.hash(req.body.password, 10)
    //Si tout est bon crée un user
    try {
        let user = new User(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            passwordhash,
            new Date(),
            new Date(),
            'user'
        )
        //Envoie la réponse au serveur en y mettant dans le dossier ChickEvent puis met l'User dans la collection ChickenUser.
        let resultat = await client
        .db('ChickEvent')
        .collection('ChickenUser')
        .insertOne(user)
        const id = user._id;
        res.status(200).json({resultat: resultat, id: id})
    } 
    //Si la réonse est pas bonne renvoie ca
    catch (e) {
        res.status(500).json(e)
    }
}

const LogIn = async (req,res) => {
    //Vérification du name et du mot de passe
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: 'Nom ou mot de passe incorrect'})
        return
    }

    let user = await client
    .db('ChickEvent')
    .collection('ChickenUser')
    //On recherche dans la BDD si ce que le client a mis correspond avec notre données.
    .findOne({ email: req.body.email })

    if(!user) {
        res.status(401).json({ error: 'Aucun compte a ce nom'})
        return
    }
    //On crée une variable pour vérifier si le mot de passe hasher et identique.
    const isValidPassword = bcrypt.compare(req.body.password, user.password)
    if(!isValidPassword) {
        res.status(401).json({ error: 'Mot de Passe incorrect'})
    } else {
        //On vérifie si le token et identique
        const toktok = jwt.sign(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                //On change la date en version française.
                gdpr: new Date(user.gdpr).toLocaleDateString('fr')
            },
            process.env.MA_SECRETKEY,
            { expiresIn: '10d'}
        )
        res.status(200).json({ jwt: toktok })
    }
}
module.exports = {
    SignUp, LogIn
}