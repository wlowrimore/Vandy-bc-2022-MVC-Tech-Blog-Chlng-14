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

// GET all users
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

// GET single user
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
          attributes: ['id', 'title', 'post_url', 'created_at']
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
router.post('/signup', (req, res) => {
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbuserData.username;
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
router.post('/login', async (req, res) => {
  // expects {username: '', password: ''}
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username
      },
    });

    if (!dbUserData) {
      res.status(400).json({
        message: 'Incorrect Username or Password. Please Try Again!'
      });
      return;
    }

    // Verify User
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect Password!'
      });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json({
        user: dbUserData,
        message: 'You Are Now Logged In!'
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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