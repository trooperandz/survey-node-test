'use strict';

var models = require('../models');
var services = require('../services/services');

// Select a random question and serve the index page
function getRandomQuestion(req, res) {
    services.getRandomQuestion().then(function(question) {
        if (question.length > 0) {
            var ques = question[0].dataValues.question;
            var QuestionId = question[0].dataValues.id;
            var choices = question[0].Choices;
            res.render('index', { question:ques, choices:choices, QuestionId:QuestionId, adminUser: req.session.firstName });
        } else {
            // There are no questions in the database yet. Show feedback message
            res.render('index', { noSystemQuestions: true, adminUser:req.session.firstName });
        }
    });
}

module.exports = {
    // Serve main page and provide appropriate survey question (do not show duplicate to previous guest)
    renderIndexPage: function(req, res) {
        // Check Guests table to see if IP address is already registered.
        var ipAddress = req.ip;
        services.getGuest(ipAddress).then(function(guest) {
            if(guest) {
                // Generate list of questionIds already answered. Get guestId first
                var guestId = guest.dataValues.id;
                // Save guestId as session var for later reuse
                req.session.guestId = guestId;
                services.getAnswerQuestionIds(req.session.guestId).then(function(questionIds) {
                    // Note: questionIds will be an array in all cases.  Empty if no entries found.
                    if(questionIds.length > 0) {
                        // User has previous answers. Generate an array of all questionIds for later use in NOT IN clause
                        var questionIdArray = questionIds.map(function(data) {
                            return data.dataValues.QuestionId;
                        });
                        console.log('questionIdArray after map: ' , questionIdArray);
                        /** Now get a question that has not already been answered by guest
                         * If question is found, render index page with question
                         * If no question is found, show feedback that all questions have already been answered by guest
                         */
                        services.getNewQuestion(questionIdArray).then(function(question) {
                            if (question.length > 0) {
                                var ques = question[0].dataValues.question;
                                var QuestionId = question[0].dataValues.id;
                                var choices = question[0].Choices;
                                var cookie = 'cookie: ' + req.session.cookie;
                                res.render('index', { question:ques, choices:choices, QuestionId:QuestionId, adminUser:req.session.firstName, cookie:cookie });
                            } else {
                                // Note: do not need to pass other params.  Will read false
                                res.render('index', { allQuestionsAnswered: true, adminUser:req.session.firstName });
                            }
                        });
                    } else {
                        // User has no recorded answers.  Generate random question.
                        getRandomQuestion(req, res);
                    }
                });
            } else {
                // User has never answered a question.  First, create new Guest record.
                // Next, select a random question from Question table
                services.insertGuest(ipAddress).then(function(guest) {
                    // Save guestId as session var for use in survey form processing
                    req.session.guestId = guest.dataValues.id;
                    getRandomQuestion(req, res);
                });
            }
        });
    },

    // Process guest survey question selection (from AJAX request)
    processSurveySelection: function(req, res) {
        // Set guestId from session var for table insertion
        // Should always be set at this point.
        // Provide fail-safe in case of unknown error
        var GuestId = req.session.guestId;
        if (!GuestId) {
            res.send('error');
        }

        var QuestionId = req.body.QuestionId;
        var ChoiceId = req.body.ChoiceId;

        services.insertAnswer(ChoiceId, GuestId, QuestionId).then(function(answer) {
            if (answer) {
                res.send('success')
            } else {
                res.send('error');
            }
        });
    }
}