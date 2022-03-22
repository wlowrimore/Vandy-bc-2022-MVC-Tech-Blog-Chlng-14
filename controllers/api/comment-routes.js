const router = require('express').Router();
const {
  Comment
} = require('../../models');

const withAuth = require('../../utils/auth');


// GET all COMMENTS
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});

// GET a SINGLE COMMENT
router.get('/:id', withAuth, (req, res) => {
  Comment.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a COMMENT
router.put('/:id', withAuth, (req, res) => {
  Comment.update({
    comment_text: req.body.comment_text
  }, {
    where: {
      id: req.params.id
    }
  }).then(dbCommentData => {
    if (!dbCommentData) {
      res.status(400).json({
        message: 'No Comment Found By This Id!'
      });
      return;
    }
    res.json(dbCommentData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// CREATE a new COMMENT
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
      })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// DELETE a COMMENT
router.delete('/:id', withAuth, (req, res) => {
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