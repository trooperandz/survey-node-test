'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Answer.belongsTo(models.Choice);
        Answer.belongsTo(models.Guest);
      }
    }
  });
  return Answer;
};