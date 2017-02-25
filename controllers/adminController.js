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
        // Get all questions
        services.getQuestions().then(function(questions) {
            //console.log('questions: ' , questions);
            // Test to get one set of question choices
            // questions[0].Choices.forEach(function(choiceObj) {
            //     console.log('choice: ' , choiceObj.dataValues.choice);
            // });
            // Test to get sets of questions and choices
            /* Preferred format:
                questionArr: [
                    {
                        question: '.....',
                        choices: [
                            {

                            },
                            {

                            }
                        ]
                    }
                ]
            */
            var questionArr = [];

            questions.forEach(function(question, i) {
                var questionObj = {};
                var choiceArr = [];
                var choiceObj = {};
                questionObj.index = i+1;
                questionObj.question = question.dataValues.question;
                //console.log('question: ' + question.dataValues.question);
                question.Choices.forEach(function(choice) {
                    //choiceObj.choice = choice.dataValues.choice;
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
    }
}