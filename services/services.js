// Provide all system db actions

var Sequelize = require('sequelize'),
    models = require('../models');

module.exports = {
    // User actions
    getUser: function(email) {
        return models.User.findOne({
            where: { email:email }
        });
    },

    insertUser: function(name, email, password, ipAddress, admin) {
        return models.User.create({
            name:name,
            email:email,
            password:password,
            ipAddress:ipAddress,
            admin:admin
        });
    },

    // Question actions
    insertQuestion: function(question) {
        return models.Question.create({
            question:question
        });
    },

    insertChoice: function(choice, QuestionId) {
        return models.Choice.create({
            choice:choice,
            QuestionId:QuestionId
        });
    },
}