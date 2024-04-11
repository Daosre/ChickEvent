const { User } = require('../Model/User')
const client = require('../Services/Connexion')


const Enregistrement = async (req,res) => {
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
    //Si tout est bon crée un user
    try {
        let user = new User(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            new Date(),
            new Date(),
            true
        )
        //Envoie la réponse au serveur en y mettant dans le dossier ChickEvent puis met l'User dans la collection ChickenUser.
        let resultat = await client
        .db('ChickEvent')
        .collection('ChickenUser')
        .insertOne(user)
        res.status(200).json(resultat)
    } 
    //Si la réonse est pas bonne renvoie ca
    catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}