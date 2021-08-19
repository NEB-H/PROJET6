//Import express
const express = require('express')  

//app est une fonction express
const app =express()

// Autoriser l'acces a l API ERREUR CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  }); 

//application (reaction de l api)
app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });
 
//export de l application pour y acceder depuis d'autre fichier
module.exports = app;
