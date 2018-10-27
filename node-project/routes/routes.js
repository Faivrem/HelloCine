var express = require('express')
var router = express.Router()
const listFilms = require('../public/films.json')
const listUsers = require('../public/users.json')



router.get('/list', (req, res) => {
    res.json(listFilms)
})

router.post('/list', (req, res) => {
    list.push({
        name: req.body.name
    })
    res.send('OK')
})

router.post('/login', (req, res) => {
  const username = req.body.user
  const password = req.body.password
  console.log(req.body)
  if (listUsers[username] == password){
      console.log('connecté')
      res.status(200).json({
        user: "test",
        privilege :"user"
      })
  }
  else {
    res.status(400).send()
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
})

/*
router.post('/connect', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username === 'louis' && password === 'secret') {
        console.log('connecté')
    } else {
        res.status(400).send('Bouuuh mauvais mdp')
    }
})*/

module.exports = router