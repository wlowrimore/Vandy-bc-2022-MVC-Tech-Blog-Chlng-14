const router = require('express').Router();
const {
  Comment
} = require('../../models');
const {
  User
} = require('../../models');


// GET all COMMENTS
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

// GET a SINGLE COMMENT
router.get('/:id', (req, res) => {
  Comment.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
      include: [{
        model: User,
        attributes: ['username']
      }]
    })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({
          message: 'No Comment Found With This Id!'
        });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a COMMENT
router.put('/:id', (req, res) => {
  Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(dbCommentData => {
      if (!dbCommentData[0]) {
        res.status(404).json({
          message: 'No Comment Found By This Id'
        });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE(POST) a new COMMENT
router.post('/', (req, res) => {
  Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DELETE a COMMENT
router.delete('/:id', (req, res) => {
  Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({
          message: 'No Comment Found With This Id!'
        });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;