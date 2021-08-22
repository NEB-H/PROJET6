//Recuperation express
const express = require('express')  
//app est une fonction express
const app =express()
//recuperer mongoose
const mongoose = require('mongoose');
//recuperer body parser pour transformer le a requete de json a java script
const bodyParser = require('body-parser');
//recuperer route user
const userRoutes = require('./routes/user');

//Connection a la BDD 
mongoose.connect('mongodb+srv://Mohammedeereterte:ZjmyxF6yCSf7C4B@cluster0.6myqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// Autoriser l'acces a l API ERREUR CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  }); 
 //Utiliser bodyparser pour transformer des requete de json a objet java script 
app.use(bodyParser.json())


//utilisation router user
app.use('/api/auth', userRoutes);



//export de l application pour y acceder depuis d'autre fichier
module.exports = app;
