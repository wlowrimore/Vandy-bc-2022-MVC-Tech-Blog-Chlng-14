const router = require('express').Router();
const {
  User,
  Post,
  Comment
} = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// GET all USERS
router.get('/', (req, res) => {
  User.findAll({
      attributes: {
        exclude: ['password']
      }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET single USER
router.get('/:id', (req, res) => {
  User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        id: req.params.id
      },
      include: [{
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          }
        }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id!'
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// SIGNUP ROUTE
router.post('/', (req, res) => {
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    // SAVE USER's Credentials
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;

        res.status(200).json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a USER
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No User Found By This Id!'
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// USER LOGIN ROUTE
router.post('/login', (req, res) => {
  // looks for username in storage
  User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({
          message: 'No User Found With That username!'
        });
        return;
      }
      // if username is found, we verify their password
      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({
          message: 'Invalid Password!'
        });
        return;
      }
      // if all goes well, we save their info and grant them access
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;

        res.json({
          user: dbUserData,
          message: 'You Have Successfully Logged In!'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// USER LOGOUT ROUTE
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(204).end();
  }
});

module.exports = router;