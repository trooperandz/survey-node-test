'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        ipAddress: DataTypes.STRING,
        admin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // Associations
      }
    }
  });
  return User;
};