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
      User.belongsTo(models.Profile)
      User.hasMany(models.Post, {
        foreignKey: 'UserId'
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
    password: DataTypes.STRING,
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