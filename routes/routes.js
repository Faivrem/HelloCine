const express = require('express');
const router = express.Router();
const listFilms = require('../public/films.json');
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
    console.log('ok')
  listFilms.splice(req.body.Index,1)
  for (let i=0; i<listFilms.length ; i++){
    listFilms[i].Index = i
  }
  res.status(200).send('OK')
});



/* inscription */
router.post('/register', (req,res,next) => {
    var message ="Votre inscription s'est bien déroulée"
    for (userDb of users) {
      if (userDb.username === req.body.username) { /*  A modifier */
          message = "Attention, l'utilisateur existe déjà !"
      }
    }
    if (message==="Votre inscription s'est bien déroulée"){
      users.push(req.body)
      res.status(200).send(message)
    }else{
      res.status(201).send(message)
    }
})

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
        const {username, password} = req.body;

        console.log(req.body);

        if(typeof username !== 'string' || !username) {
            throw new Error("username n'est pas défini");
        }

        if(typeof password !== 'string' || !password) {
            throw new Error("password n'est pas défini");
        }

        let user = null;

        for (let i = 0; i < users.length; i++) {
            const currentUser = users[i];
            console.log(currentUser)
            if (currentUser.username === username && /*bcrypt.compareSync(password, currentUser.password)*/ currentUser.password === password) {
                user = currentUser;
                break;
            }
        }
        //const user = users.find(u => u.username === username && u.password === password)
        console.log("User : " + user)
        if(!user) {
            throw new Error("Aucun compte avec ces identifiants");
        }
        req.session.user = user;
        res.json({id: user.id, username: user.username})

    } catch (err) {
        next(err)
    }
})

module.exports = router;