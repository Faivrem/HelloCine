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


/* inscription */
router.post('/register', (req,res) => {
    if (users.hasOwnProperty(req.body.login)){
        res.status(401).send('NOK')
    }
    else{
        users.push(req.body)
        res.status(200).send('OK')
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




/* User

// authenticate user
router.post('/login', (req,res) => {
    const username = req.body.login;
    const password = req.body.password;
    if (!req.body.login || !req.body.password || !req.body.repeatpassword) {
        throw new Error('INVALID_PARAMETERS');
    }

    const users = JSON.parse(fs.readFileSync(listUsers));
    let user = null;

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (currentUser.username === username && bcrypt.compareSync(password, currentUser.password)) {
            user = currentUser;
            break;
        }
    }

    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }
    // On renvoie pas son password
    delete user.password;
    const payload = {
        user: user
    };

    const token = jwt.sign(payload, 'monsecret', {
        expiresIn: '1d'
    });

    return token;
});

// register a new user
router.post('/register', (req,res) => {
    if (!req.body.login || !req.body.password || !req.body.repeatpassword) {
        res.status(400).send('Invalid parameters');
    }

    const users = JSON.parse(fs.readFileSync(listUsers));

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (currentUser.username === username) {
            // username already exists
            res.status(400).send('Username already exists');
        }
    }

    let id = 1;
    if (users.length > 0) {
        id = users[users.length - 1].id + 1;
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const user = {
        id: id,
        username: username,
        password: hash,
        level: 'USER'
    };

    users.push(user);
    fs.writeFileSync(listUsers, JSON.stringify(users));
});
*/




module.exports = router;