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

    // Load view questions page
    renderViewQuestionsPage: function(req, res) {
        // Get all questions.  Package into usable JSON format.
        services.getQuestions().then(function(questions) {
            var questionArr = [];

            questions.forEach(function(question, i) {
                var questionObj = {};
                var choiceArr = [];
                var choiceObj = {};
                // Used for question display count.  Do not start at zero
                questionObj.index = i+1;
                questionObj.question = question.dataValues.question;
                questionObj.questionId = question.dataValues.id;
                question.Choices.forEach(function(choice) {
                    choiceArr.push(choice.dataValues.choice);
                    console.log('choice: ' + choice.dataValues.choice);
                });
                questionObj.choices = choiceArr;
                questionArr.push(questionObj);
            });
            console.log('questionArr: ' , questionArr);
            res.render('viewQuestions', { questions:questionArr });
        });
    },

    // Load view answers page
    renderViewAnswersPage: function(req, res) {
        res.render('viewAnswers');
    },

    // Process new question insertion
    createQuestion: function(req, res) {
        // Note: data will arrive as JSON string
        var data = JSON.parse(req.body.data);
        var question = false;
        var questionId = 1;

        // Get all values in loop
        var questionObj = {};
        var answerObjArr = [];
        data.forEach(function(obj) {
            if (obj.name == 'question') {
                questionObj = obj;
            } else if (obj.name == 'answer') {
                answerObjArr.push(obj);
            }
        });

        // Insert question first, then answers
        services.insertQuestion(questionObj.value).then(function(question) {
            if (question) {
                var questionId = question.dataValues.id;
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
        res.send('success');
    },

    // Delete the selected question
    deleteQuestion: function(req, res) {
        var questionId = req.body.questionId;
        services.deleteQuestion(questionId).then(function(question) {
            console.log('question: ' , question);
            res.send('success');
        });
    },
}