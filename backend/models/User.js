//Recupere BDD
const mongoose = require('mongoose');
//AJOUT PACKAGE POUR EVITER LES ERREUR MANGO
const uniqueValidator = require('mongoose-unique-validator');
//Schema user

const userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true }, //on ajoute l attribut unique pour qu il ne puisse enregistrer qu un compte par mail
    password: { type: String, required: true } 
}); 

//UTILISATION PACKAGE UNIQUE VALIDATORE
userSchema.plugin(uniqueValidator);

//export
module.exports = mongoose.model('User', userSchema);