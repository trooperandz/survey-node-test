var models = require('../models'),
    services = require('../services/services');

module.exports = {
    // Serve main page and provide appropriate survey question (do not show duplicate to previous guest)
    renderIndexPage: function(req, res) {
        // Check Guests table to see if IP address is already registered.
        var ipAddress = req.ip;
        services.getGuest(ipAddress).then(function(guest) {
            if(guest) {
                // Generate list of questionIds already answered. Get guestId first
                console.log('previous guest was found!');
                var guestId = guest[0].dataValues.id
                console.log('guestId from found guest query: ' + guestId);
                // Save guestId as session var for later reuse
                req.session.guestId = guestId;
                console.log('session guestId: ' + req.session.guestId);
                /*
                models.Answer.findAll({
                    where: {guestId:guestId},
                    attributes: ['QuestionId'],
                }).then(function(answer) {
                    // Generate array of all questionId's
                    console.log('answer: ', answer);
                });*/

            } else {
                // User has never answered a question.  First, create new Guest record.
                // Next, select a random question from Question table
                services.insertGuest(ipAddress).then(function(guest) {
                    console.log('guest in new user block: ' , guest);
                    // Save guestId as session var for use in survey form processing
                    req.session.guestId = guest[0].dataValues.id;
                    console.log('session guestId in new user block: ' + req.session.guestId);
                    services.getRandomQuestion().then(function(question) {
                        var ques = question[0].dataValues.question;
                        var choices = question[0].Choices;
                        res.render('index', { question:ques, choices:choices });
                    });
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