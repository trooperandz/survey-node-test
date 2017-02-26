var models = require('../models'),
    services = require('../services/services');

// Select a random question and serve the index page
function getRandomQuestion(req, res) {
    services.getRandomQuestion().then(function(question) {
        var ques = question[0].dataValues.question;
        var QuestionId = question[0].dataValues.id;
        var choices = question[0].Choices;
        res.render('index', { question:ques, choices:choices, QuestionId:QuestionId });
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
                console.log('existing guest was found!');
                var guestId = guest.dataValues.id;
                // Save guestId as session var for later reuse
                req.session.guestId = guestId;
                console.log('session guestId: ' + req.session.guestId);
                services.getAnswerQuestionIds(req.session.guestId).then(function(questionIds) {
                    // Note: questionIds will be an array in all cases.  Empty if no entries found.
                    if(questionIds.length > 0) {
                        // User has previous answers. Generate an array of all questionIds for later use in NOT IN clause
                        console.log('questionIds were found: ', questionIds);
                        var questionIdArray = questionIds.map(function(data) {
                            return data.dataValues.QuestionId;
                        });
                        console.log('questionIdArray after map: ' , questionIdArray);
                        // Now get a question that has not already been answered by guest
                        // If question is found, render index page with question
                        // If no question is found, show feedback that all questions have already been answered by guest
                        services.getNewQuestion(questionIdArray).then(function(question) {
                            console.log('new question generated: ' , question);
                            if (question.length > 0) {
                                var ques = question[0].dataValues.question;
                                var QuestionId = question[0].dataValues.id;
                                var choices = question[0].Choices;
                                res.render('index', { question:ques, choices:choices, QuestionId:QuestionId });
                            } else {
                                // Note: do not need to pass other params.  Will read false
                                res.render('index');
                            }
                        });
                    } else {
                        // User has no recorded answers.  Generate random question.
                        console.log('no questionIds were found. generating new question');
                        getRandomQuestion(req, res);
                    }
                });
            } else {
                // User has never answered a question.  First, create new Guest record.
                // Next, select a random question from Question table
                services.insertGuest(ipAddress).then(function(guest) {
                    console.log('new guest encountered!');
                    console.log('guest in new user block: ' , guest);
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
                console.log('answer inserted: ' , answer);
                res.send('success')
            } else {
                console.log('answer not inserted');
                res.send('error');
            }
        });
    },
}