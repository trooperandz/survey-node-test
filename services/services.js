// Provide all system db actions

var Sequelize = require('sequelize');
var models = require('../models');

module.exports = {
    /* Index actions */
    // See if site visitor is already registered
    getGuest: function(ipAddress) {
        return models.Guest.findOne({
            where: {
                ipAddress:ipAddress
            }
        });
    },

    // If site visitor in not registered, insert into guest table
    insertGuest: function(ipAddress) {
        return models.Guest.create({
            ipAddress:ipAddress
        });
    },

    /* User actions */
    // Get admin user for login actions
    getUser: function(email) {
        return models.User.findOne({
            where: {
                email:email
            }
        });
    },

    // Insert new admin user
    insertUser: function(name, email, password, ipAddress, admin) {
        return models.User.create({
            name:name,
            email:email,
            password:password,
            ipAddress:ipAddress,
            admin:admin
        });
    },

    /* Question & Answer actions */
    // Return array of QuestionId's for one visitor (guest)
    getAnswerQuestionIds: function(guestId) {
        return models.Answer.findAll({
            where: {
                guestId:guestId
            },
            attributes: ['QuestionId']
        });
    },

    // Insert site visitor's survey answer
    insertAnswer: function(ChoiceId, GuestId, QuestionId) {
        return models.Answer.create({
            ChoiceId:ChoiceId,
            GuestId:GuestId,
            QuestionId:QuestionId
        });
    },

    // Get all questions in the database for admin viewing
    getQuestions: function() {
        return models.Question.findAll({
            include: [{
                model: models.Choice
            }]
        });
    },

    // Get a question that the guest has not been previously asked
    getNewQuestion: function(questionIdArray) {
        return models.Question.findAll({
            where: {
                id: {
                    $notIn: questionIdArray
                }
            },
            order: [
                [ Sequelize.fn('RAND') ]
            ],
            limit: 1,
            include: [{
                model: models.Choice
            }]
        });
    },

    // Get a random question from the database.
    getRandomQuestion: function() {
        // TODO: order choices by ChoiceId
        return models.Question.findAll({
            limit: 1,
            order: [ [Sequelize.fn('RAND')] ],
            include: [{
                model: models.Choice
            }]
        });
    },

    // Get all guest answers
    getGuestAnswers: function() {
        return models.Answer.findAll({
            attributes: [
                'GuestId', 'ChoiceId', 'QuestionId'
            ],
            order: 'GuestId',
            include: [
                {
                    model: models.Question
                },
                {
                    model: models.Choice
                },
                {
                    model: models.Guest
                }
            ]
        });
    },

    // Insert new question into the database
    insertQuestion: function(question) {
        return models.Question.create({
            question:question
        });
    },

    // Delete a specific question from the database
    deleteQuestion: function(questionId) {
        return models.Question.destroy({
            where: {
                id: questionId
            }
        });
    },

    // Insert choices related to QuestionId
    insertChoice: function(choice, QuestionId) {
        return models.Choice.create({
            choice:choice,
            QuestionId:QuestionId
        });
    }
}