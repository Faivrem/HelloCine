// Import librairies
const express = require('express');
const app = express();

const port = 3000;


/* Les routes */
app.get('/', (req, res) => res.send('Accueil'))
app.get('/deconnexion', (req, res) => res.send('deconnexion'))
app.get('/connexion', (req, res) => res.send('Connexion'))
app.get('/films', (req, res) => res.send('Liste des films'))
app.get('/films/:id_films', (req, res) => res.send('Films id :'+ req.params.id_films))
app.get('/ajouter', (req, res) => res.send('Ajouter un film'))


app.get('/:prenom', (req, res) => res.send('Hello World!'+req.params.prenom))
/***************/



app.listen(port, () => console.log(`App listening on port ${port}!`))