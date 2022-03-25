const {
  Comment
} = require('../models');

const CommentData = [{
    comment_text: "Yes! I couldn't agree More!",
    post_id: 1,
    user_id: 4
  },
  {
    comment_text: "After Calipari left for Kentucky, the Memphis Fans begged for Penny to come home!",
    post_id: 2,
    user_id: 4
  },
  {
    comment_text: "We are National Championship material!",
    post_id: 3,
    user_id: 2
  },
  {
    comment_text: "The University of Memphis is my alma mater.  This is where I belong!",
    post_id: 4,
    user_id: 1
  },
  {
    comment_text: "Sorry just_a_tech_guy, this is 'just a test blog'...CALM DOWN!!!",
    post_id: 5,
    user_id: 4
  }
];

const seedComments = () => Comment.bulkCreate(CommentData);

module.exports = seedComments;