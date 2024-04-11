const express = require('express');
const app = express();
const { connect } = require('./Services/Connexion');
const userRoutes = require('./Controller/Routes/user');

app.use(express.json())
app.use('/user', userRoutes)

//Connection avec la base de données.
connect('mongodb://127.0.0.1:27017', (error) => {
    if (error) {
        console.log('Failed to connect')
        process.exit(-1)
    } else {
        console.log('👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌')
    }
})
//L'endroit écouté.
app.listen(3107);





