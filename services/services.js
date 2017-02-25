// Provide all system db actions

var Sequelize = require('sequelize'),
    models = require('../models');

module.exports = {
    // Index actions
    getGuest: function(ipAddress) {
        return models.Guest.findOne({
            where: {ipAddress:ipAddress}
        });
    },

    insertGuest: function(ipAddress) {
        return models.Guest.create({
            ipAddress:ipAddress
        });
    },

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

    // Question & Answer actions
    getAnswerQuestionIds: function(guestId) {
        return models.Answer.findAll({
            where: {guestId:guestId},
            attributes: ['QuestionId'],
        });
    },

    getQuestions: function() {
        return models.Question.findAll({
            include: [{
                model: models.Choice
            }]
        });
    },

    getRandomQuestion: function() {
        // TODO: order choices by ChoiceId
        return models.Question.findAll({
            limit: 1,
            order: [ [Sequelize.fn('RAND')] ],
            include: [{  model: models.Choice }],
        });
    },

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