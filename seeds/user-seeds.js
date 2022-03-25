const {
  User
} = require('../models');

const UserData = [{
    username: "penny_hardaway",
    email: "oneCent@uofm.edu",
    password: "NITChamps2021"
  },
  {
    username: "larry_brown",
    email: "assistCoach@uofm.edu",
    password: "legendary81"
  },
  {
    username: "jalen_duren",
    email: "jduren@uofm.edu",
    password: "allConference2022"
  },
  {
    username: "memphis_Bball_Fan",
    email: "blueblood@gmail.com",
    password: "#1FanNotInMemphis"
  },
  {
    username: "just_a_tech_guy",
    email: "codewizard@gmail.com",
    password: "upsidedown2022"
  }
];

const seedUsers = () => User.bulkCreate(UserData);

module.exports = seedUsers;