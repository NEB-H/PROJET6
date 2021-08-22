//modele user
const User = require('../models/User');
//import de bcrypt
const bcrypt = require('bcrypt') ;
//utiliser jsonwebtoken
const jwt = require('jsonwebtoken');

//fonction pour l enregistrement de nouveau user
exports.signup = (req, res, next) => {
    //HASHAGE
    bcrypt.hash(req.body.password, 10) //10 egale nombre de tours de l algorithme
    //recuperation du hash et creation de user
        .then(hash => {     
            const user = new User({
                email: req.body.email,
                password: hash
            });
        user.save()    
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })    
        .catch(error => res.status(500).json({ error }));	

};
//fonction login pour conncter des user existant
exports.login = (req, res, next) => {
    //chercher l utilisateur 
    User.findOne({ email: req.body.email })
    
    .then(user => {
        
        //Si pas de user trouve 	
        if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
        //user trouve donc compare hash du bdd au hash genere par la saisie du log	
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {

            //Si la comparaison  est incorrect 
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            //Comparaison ok donc mp valide
            res.status(200).json({
                userId: user._id,
                token: //envoi token
                 //fonction sign 
                jwt.sign(  
                    //donnees que l on veut encoder (appele payload)
                    { userId: user._id },
                    //clefs secret pour l encodage(utiliser une clefs plus longue pour la production car plus securise)
                     'RANDOM_TOKEN_SECRET',
                    //temps de validation du token
                     { expiresIn: '24h' }
                ),
            });

        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    

};

