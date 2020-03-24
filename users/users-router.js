const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.join(users);
    })
    .catch(err => res.send(err));
});

router.get('/users', (req, res) => {
  if (req.session) {
    Users.find()
      .then(users => res.status(200).json(users))
      .catch(err =>
        res
          .status(500)
          .json({ message: 'There was an error retrieving the user list' })
      );
  } else {
    res.status(401).json({ message: 'Please login to view this content' });
  }
});

module.exports = router;
