const {
  Model,
  DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create User model
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create feilds/columns for User model
User.init({
  id: {
    type: DataType
  }
})