'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: 'UserId'
      })
      User.hasMany(models.Post, {
        foreignKey: 'UserId'
      })
    }
    static newUser(username, password, role){
      return User.create({
        username, 
        password, 
        role
      })
    }
  }
  User.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please insert your username'},
        notNull: {msg: 'Please insert your username'},
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please insert your password'},
        notNull: {msg: 'Please insert your password'},
      }
    },
    role: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        const salt = bcrypt.genSaltSync(10);
        const encrypt = bcrypt.hashSync(instance.password, salt);
        instance.password = encrypt;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};