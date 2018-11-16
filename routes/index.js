const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const listFilms = require('../db/films.json');
const users = require('../db/users.json');


router.get('/list', (req, res) => {
    /*
    if(!req.session.userID) {
        throw new Error("Vous n'êtes pas connecté")
    }*/
    res.json(listFilms)
})


router.post('/list', (req, res) => {
    list.push({
        name: req.body.name
    })
    res.send('OK')
})

/* Film */

router.post('/add',(req,res) => {
  listFilms.push(req.body)
  console.log(listFilms)
  res.status(200).send('OK')
})


router.post('/edit', (req,res) => {
    listFilms[req.body.Index] = req.body
    res.status(200).send('OK')
});

router.post('/delete', (req,res) => {
    console.log('ok');
  listFilms.splice(req.body.Index,1)
  for (let i=0; i<listFilms.length ; i++){
    listFilms[i].Index = i
  }
  res.status(200).send('OK')
});



/* inscription */
router.post('/register', (req,res,next) => {
    var message ="Votre inscription s'est bien déroulée";
    for (userDb of users) {
      if (userDb.username === req.body.username) { /*  A modifier */
          message = "Attention, l'utilisateur existe déjà !"
      }
    }

    if (message==="Votre inscription s'est bien déroulée") {

        let hash = bcrypt.hashSync(req.body.password, 10);
        // Store hash in database
        users.push({ username: req.body.username, password: hash});
        console.log(users);
      res.status(200).send(message)
    } else{
      res.status(201).send(message)
    }
});

/* recup le user */
router.get('/user', (req, res, next) => {
    console.log(req.session.user)
    if(req.session.user){
        res.json(req.session.user)
    }
})


router.get('/logout', (req, res, next) => {
  req.session.destroy(function (err){
      res.status(200).send('Logout')
  })
})

router.post('/login', (req, res, next) => {
    try {
        //const {username, password} = req.body;
        const inputUser = req.body;
        let user = null;
        let message = "Identifiants incorrects";

        if(typeof inputUser.username !== 'string' || !inputUser.username) {
            //throw new Error("username n'est pas défini");
            message = "Login non défini";
        }

        if(typeof inputUser.password !== 'string' || !inputUser.password) {
            //throw new Error("password n'est pas défini");
            message = "Mot de passe non défini";
        }

        for (let i = 0; i < users.length; i++) {
            const currentUser = users[i];
            //console.log(currentUser);
            if (currentUser.username === inputUser.username) {
                if(bcrypt.compareSync(inputUser.password, currentUser.password)) {
                    // Passwords match
                    user = currentUser;
                    break;
                } else {
                    // Passwords don't match
                    message = "Mot de passe incorrect";
                }
            }
        }

        if(user != null) {
            message = "Connexion successfull";
            req.session.user = user;
            res.status(200).send({username:user.username, message:message, status:200});
                //status(200).send(message);
        }
        else {
            //res.status(201).send(message);
            res.status(201).send({username:null, message:message, status:201});
        }
        console.log("User : " + user);
        console.log("message: " + message);
        /*
        if(!user) {
            if (message != "Wrong password") {
                throw new Error("Aucun compte avec ces identifiants");
                //res.json({username: null, message: message})
                res.status(201).send(message)
            }
        } else {
            req.session.user = user;
            res.status(200).send(message)
        }*/

    } catch (err) {
        next(err)
    }
});

module.exports = router;