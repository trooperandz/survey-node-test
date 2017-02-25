var models = require('../models'),
    services = require('../services/services');

module.exports = {
    // Load main index page
    renderIndexPage: function(req, res) {
        res.render('questions');
    },

    // Load add question page
    renderCreateQuestionPage: function(req, res) {
        res.render('createQuestion');
    },

    // Process new question insertion
    createQuestion: function(req, res) {
        // Note: data will arrive as JSON string
        var data = JSON.parse(req.body.data);
        var question = false;
        var questionId = 1;
        console.log('data: ' , data);
        // insert Choice test
        /*
        services.insertChoice('choice test', ).then(function(choice) {
            console.log('choice: ' , choice);
        });*/

        // 1) Get all values in loop
        var questionObj = {};
        var answerObjArr = [];
        data.forEach(function(obj) {
            if (obj.name == 'question') {
                questionObj = obj;
            } else if (obj.name == 'answer') {
                answerObjArr.push(obj);
            }
        });
        console.log('questionObj: ' , questionObj + 'answerObjArr: ' , answerObjArr);

        // 2) Insert question first
        services.insertQuestion(questionObj.value).then(function(question) {
            if (question) {
                console.log('question: ' + question);
                var questionId = question.dataValues.id;
                console.log('questionId in insertQuestion: ' + questionId);
                // Now insert all choices
                answerObjArr.forEach(function(answerObj) {
                    services.insertChoice(answerObj.value, questionId).then(function(choice) {
                        console.log('choice: ' , choice);
                    });
                });
            } else {
                res.send('error');
            }
        });

        // Test insert choice
        // services.insertChoice('test2', 11).then(function(choice) {
        //     console.log('choice: ' , choice);
        // });

        /*
        data.forEach(function(obj) {
            // Insert question into db first & retrieve questionId for answer foreign key
            if (obj.name == 'question') {
                question = obj.value;
                services.insertQuestion(question).then(function(question) {
                    if (question) {
                        console.log('question: ' + question);
                        var questionId = question.dataValues.id;
                        console.log('questionId in insertQuestion: ' + questionId);
                    } else {
                        res.send('error');
                    }
                });
            } else if (obj.name == 'answer') {
                console.log('questionId in answer block: ' + questionId);
                services.insertChoice(obj.value, questionId).then(function(choice) {
                    console.log('choice: ' , choice);
                });
            } else {
                // Possible query error
                res.send('error');
            }
        });*/
        res.send('success');
    }
}