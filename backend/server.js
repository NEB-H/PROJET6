//Import du package HTTP
const http = require ('http');
//Import fichier app 
const app = require('./app');

//Indication du port a utiliser
app.set('port', process.env.PORT || 3000);

//Creation du server
const server = http.createServer(app);

//Ecoute des requetes port 3000
server.listen(process.env.PORT || 3000);