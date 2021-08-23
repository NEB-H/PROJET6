//Recuperation du package HTTP
const http = require ('http');
//Recuperatio app 
const app = require('./app');

//Indication du port a utiliser uniquement 300
app.set('port', process.env.PORT || 3000);

//Creation du server
const server = http.createServer(app);

//Ecoute des requetes port 3000
server.listen( process.env.PORT || 3000);