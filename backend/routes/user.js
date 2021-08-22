//import express
const express = require('express');
//creation routeur
const router = express.Router();
//Chemin controllers
const userCtrl = require('../controllers/user');

//Utilisation router
//POST SINGUP
router.post('/signup', userCtrl.signup);
//POST LOGIN
router.post('/login', userCtrl.login);

//export du router
module.exports = router;