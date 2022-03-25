const {
  Post
} = require('../models');

const PostData = [{
    title: "We Had A Great Run...Despite...",
    post_text: "After an explosive start, then a drastic plunge, the Memphs Tigers Basketball Program sent shockwaves through the sports nation!",
    user_id: 1
  },
  {
    title: "If any coach can win a Championship Title in his first 4 years...it's headcoach Penny Hardaway!",
    post_text: "NBA Allstar, NBA Champ, Olympic gold medalist, and now University of Memphis headcoach Penny Hardaway is blazing a path to a National Championship!",
    user_id: 2
  },
  {
    title: "The Memphis Tigers will prevail if/when Penny pulls in the top class next season!",
    post_text: "All I can say is 'GO TIGERS GO!!!",
    user_id: 4
  },
  {
    title: "We fough hard and had Gonzaga Beat, but touch foul calls lost us our 12 point lead!",
    post_text: "The officials need to allow the big guys to play.  We aren't nimble like the smaller players!",
    user_id: 3
  },
  {
    title: "THIS IS A TECH BLOG, NOT A SPORTS BLOG!!!!!!",
    post_text: "All you sports people made a wrong turn! Post about technical stuff ONLY!!!",
    user_id: 5
  }
];

const seedPosts = () => Post.bulkCreate(PostData);

module.exports = seedPosts;