module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {

}, {
    classMethods: {
        associate: function(models) {
            // Foreign key choiceId in Answer model
            Answer.belongsTo(models.Choice);
            // Foreign key guestId in Answer model
            Answer.belongsTo(models.Guest);
            // Foreign key questionId in Answer model
            // Delete all associated answers when a QuestionId is deleted
            Answer.belongsTo(models.Question,
                {onDelete: 'CASCADE'}
            );
        }
    }
  });
  return Answer;
};