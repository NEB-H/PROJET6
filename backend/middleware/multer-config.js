//Recuperation de multer
const multer = require('multer') ;
//Creation d’un un dictionnaire mimetype
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//Objet de configuration pour multer
const storage =	multer.diskStorage({//fonction multer permettant d’enregistrer sur le disque
	//Destination d’enregistrement 
	destination: (req, file, callback) => {
		callback(null, 'images');
		
	},
	//Nom du fichier enregistré
  	filename: (req, file, callback) => {
			//nom origine + remplacer les espaces par underscore
    			const name = file.originalname.split(' ').join('_');
			//extension du fichier a partir du mimetype
    			const extension = MIME_TYPES[file.mimetype];
			//Creation du filename entier
    			callback(null, name + Date.now() + '.' + extension);
  	}
})

//Export
module.exports = multer({storage: storage}).single('image');