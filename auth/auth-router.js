const router = require('express').Router();
const Users = require('./users-model.js');

const bcrypt = require('bcryptjs');

const genToken = require('./genToken.js');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 4);
  user.password = hash;

  Users.addUser(user)
       .then(newUser => {
         const token = genToken(newUser);
         res.status(201).json({ created_user: newUser, token });
       })
       .catch(err => {
         res.status(500).json({ message: 'There was an error while trying to add the user to the database.', error: err });
       });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
        .then(user => {
          if(user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user);
            res.json({ userId: user.id, token });
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Error trying to log in', error: err });
        });
});

module.exports = router;
