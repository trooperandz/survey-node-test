var models = require('../models'),
    services = require('../services/services');

// Select a random question and serve the index page
function getRandomQuestion(req, res) {
    services.getRandomQuestion().then(function(question) {
        var ques = question[0].dataValues.question;
        var choices = question[0].Choices;
        res.render('index', { question:ques, choices:choices });
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
                        // User has recorded answers. Generate an array of all questionIds.
                        console.log('questionIds were found: ', questionIds);
                        res.render('index');
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

    processSurveySelection: function(req, res) {
        // Save visitor's IP address
        var ipAddress = req.ip;
        var QuestionId = req.body.QuestionId;
        var ChoiceId = req.body.ChoiceId;


    },
}