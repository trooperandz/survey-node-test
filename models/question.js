module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define('Question', {
        question: DataTypes.STRING
  }, {
    classMethods: {
        associate: function(models) {
        // Foreign key questionId in Choice model
        Question.hasMany(models.Choice);
      }
    }
  });
  return Question;
};