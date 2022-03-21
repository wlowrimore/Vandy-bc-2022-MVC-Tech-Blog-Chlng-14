const router = require('express').Router();
const {
  Post
} = require('../../models');
const {
  User
} = require('../../models');
const {
  Comment
} = require('../../models');

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
          attributes: ['id', 'title', 'content', 'created_at']
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

// USER LOGIN ROUTE
router.post('/login', (req, res) => {
  User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({
          message: 'No User Found With That Username'
        });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({
          message: 'Invalid Password!'
        });
        return;
      }
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;
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
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({
          message: 'No User Found With This Id'
        });
        return;
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/home', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    }
  }
  res.status(500).json(err);
});

module.exports = router;