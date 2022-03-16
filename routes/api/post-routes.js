const router = require('express').Router();
const {
  Post,
  User,
  Comment
} = require('../../models');

// GET all POSTS
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
      order: [
        ['created_at', 'DESC']
      ],
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
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

// UPDATE A POST
router.put('/:id', (req, res) => {
  Post.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData[0]) {
        res.status(404).json({
          message: 'No Post Found By This Id'
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