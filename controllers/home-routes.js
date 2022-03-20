const router = require('express').Router();
const sequelize = require('../config/connection');
const {
  Post,
  User,
  Comment
} = require('../models');

// GET all POSTS for homepage
router.get('/', (req, res) => {
  console.log('========================');
  Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at'
      ],
      include: [{
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      // pass a single post object into the homepage template
      const posts = dbPostData.map(post => post.get({
        plain: true
      }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// LOGIN
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

// LOGOUT
router.get('/logout', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('/');
});

module.exports = router;