const Sauces = require('../models/Sauces');
//Recuperation du package fs de node
const fs = require('fs');

//export recuperation des sauces
exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

//export fonction creating qui creer un objet
exports.createSauces = (req, res, next) => {
    //parse de lobjet recupere car l ajout d image modifie le format de la requete 
    const saucesObject = JSON.parse(req.body.sauce);
    //enleve l id genere par le front car se n 'ai pas le bon il doit etre genere par mongo
    delete saucesObject._id;
    const sauces = new Sauces({
        ...saucesObject, 
        //URL du fichier	
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //Config likes dislikes
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' '],
    });
    //enregistrement de l’objet dans la BDD
      sauces.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
  
  };
  


exports.getOneSauces =  (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };

exports.modifySauces =(req, res, next) => {
    const saucesObject = req.file ?
	//si on a une image a modifier
    {
        ...JSON.parse(req.body.sauce),
	    //generer nouvelle image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	    //si pas d’image 
    } : { ...req.body };

    Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.delete = (req, res, next) => {

    //chercher le fichier 
    Sauces.findOne({ _id: req.params.id })
      .then(sauce => {
        //recuperer nom de l image
        const filename = sauce.imageUrl.split('/images/')[1];//split retourne tableau de 2 elements 0 avant /images/ 1 apres /
        //supression du fichier
        fs.unlink(`images/${filename}`, () => {
          Sauces.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })      
      .catch(error => res.status(500).json({ error }));
     
        
};

exports.likes = (req, res, next) => {

    
    //recuperer id client envoye par front
    const userId =req.body.userId;
    //si like = 1
    if (req.body.like == 1){
    //update avis user
    Sauces.updateOne({_id: req.params.id}, {$push: { usersLiked : userId }})
    .then(()=> res.status(201).json({message: 'liked !'}));
    //update nombre de like dansableau liked    
        
    }

    else {
        //si disliked =1
        if (req.body.like == -1){res.status(201).json({message: 'disliked !'});}
        //si like = 0  il faudrat enlever l id user de userliked et userDisliked 
        else  {res.status(201).json({message: 'pas avis !'});}
    }
    //recuperer length de userLiked puis mettre dans like et length.userdisliked et le mettre dans 
};