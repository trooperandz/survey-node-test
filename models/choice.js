'use strict';

module.exports = function(sequelize, DataTypes) {
    var Choice = sequelize.define('Choice', {
        choice: DataTypes.STRING
    }, {
    classMethods: {
        associate: function(models) {
            // Foreign key questionId in Choice model
            // Delete all associated choices when a QuestionId is deleted
            Choice.belongsTo(models.Question,
                {onDelete: 'CASCADE'}
            );
            // Foreign key choiceId in Answer model
            Choice.hasMany(models.Answer);
        }
    }
  });
  return Choice;
};