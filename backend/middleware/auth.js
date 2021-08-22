const jwt = require('jsonwebtoken');
//export du middleware
module.exports = (req, res, next) => {
  try {
   //Recuperer le token dans le headers auth
    const token = req.headers.authorization.split(' ')[1];
    //Decoder et verifier le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
   //recuperer le userID
    const userId = decodedToken.userId;
   // Si userID different de userid dans le body 	
    if (req.body.userId && req.body.userId !== userId) {
	//RENVOYER USER ID NON VALIDE	
      throw 'Invalid user ID';
 } 
   //Sinon on continue 	
    else {
      next();
    }
  } catch (error){
    res.status(401).json({ error: error | 'Invalid Request !'});
  }
};
