const express = require('express');
//recuperer un router
const router = express.Router();
//recuperer models 
const Sauces = require('../models/Sauces')
// recuperer controllers
const ctrl = require('../controllers/sauces')
//recuperer auth
const auth = require('../middleware/auth');
//Import du middleware multer
const multer = require('../middleware/multer-config');

                                    //CRUD//

//GET READ
router.get('/',auth, ctrl.getAllSauces);
//POST CREATE
router.post('/',auth,multer, ctrl.createSauces);

//GET un element READ
router.get('/:id',auth , ctrl.getOneSauces);

// PUT pour modifier un objet  UPDATE
router.put('/:id', auth, multer, ctrl.modifySauces );

//DELETE
router.delete('/:id', auth, ctrl.delete);

// POST pour modifier les likes
router.post('/:id/like', auth,ctrl.likes );

//Export
module.exports = router; 