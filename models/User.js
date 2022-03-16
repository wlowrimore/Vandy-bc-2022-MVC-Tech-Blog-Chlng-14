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
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8]
    }
  }
}, {
  hooks: {
    // beforeCreate lifecycle
    async beforeCreate(newUserData) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    // beforeUpdate lifecycle
    async beforeUpdate(updatedUserData) {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    }
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'user'
});

module.exports = User;