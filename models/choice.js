'use strict';
module.exports = function(sequelize, DataTypes) {
  var Choice = sequelize.define('Choice', {
    choice: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Foreign key questionId in Choice model
        Choice.belongsTo(models.Question);
        // Foreign key choiceId in Answer model
        Choice.hasMany(models.Answer);
      }
    }
  });
  return Choice;
};