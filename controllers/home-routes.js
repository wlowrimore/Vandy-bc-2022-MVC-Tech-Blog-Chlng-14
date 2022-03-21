const router = require('express').Router();
const {
  userInfo
} = require('os');
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
        'content',
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

router.get('/post/:id', (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'content',
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
      if (!dbPostData) {
        res.status(400).json({
          message: 'No Post Found With This Id!'
        });
        return;
      }
      const post = dbPostData.get({
        plain: true
      });
      console.log(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/post-comments', (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'content',
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
      if (!dbPostData) {
        res.status(404).json({
          message: 'No Post Found By This Id!'
        });
        return;
      }
      const post = dbPostData.get({
        plain: true
      });

      res.render('posts-comments', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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