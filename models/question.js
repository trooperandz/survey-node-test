module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define('Question', {
        question: DataTypes.STRING
  }, {
    classMethods: {
        associate: function(models) {
        // Foreign key questionId in Choice model.
        // Delete all associated choices when a question is deleted
        Question.hasMany(models.Choice,
            {onDelete: 'CASCADE'}
        );
        // Foreign key questionId in Answer model
        // Delete all associated answers when a question is deleted
        Question.hasMany(models.Answer,
            {onDelete: 'CASCADE'}
        );
      }
    }
  });
  return Question;
};