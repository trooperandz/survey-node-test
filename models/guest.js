module.exports = function(sequelize, DataTypes) {
    var Guest = sequelize.define('Guest', {
        ipAddress: DataTypes.STRING
    }, {
    classMethods: {
        associate: function(models) {
            // Foreign key guestId in Answer model
            Guest.hasMany(models.Answer);
        }
    }
  });
  return Guest;
};