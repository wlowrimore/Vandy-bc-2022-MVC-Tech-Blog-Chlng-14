const router = require('express').Router();
const {
  Post,
  User
} = require('../../models');

// GET all POSTS
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
      attributes: ['id', 'post_url', 'title', 'created_at'],
      order: [
        ['created_at', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['username']
      }]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a SINGLE POST
router.get('/:id', (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [{
        model: User,
        attributes: ['username']
      }]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No Post Found With This Id!'
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE(POST) a new POST
router.post('/', (req, res) => {
  // expects {title: '', post_url: '', user_id: -}
  Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE(PUT) A POST
router.put('/:id', (req, res) => {
  Post.update({
      title: req.body.title
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No Post Found With This Id!'
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.json(500).json(err);
    });
});

// DETETE a POST
router.delete('/:id', (req, res) => {
  Post.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No Post Found With This Id!'
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;