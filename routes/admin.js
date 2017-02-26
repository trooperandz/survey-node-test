var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

// GET main page
router.get('/', adminController.renderIndexPage);

// GET addQuestion page
router.get('/addQuestionForm', adminController.renderCreateQuestionPage);

// GET viewQuestions page
router.get('/viewQuestions', adminController.renderViewQuestionsPage);

// GET viewAnswers page
router.get('/viewAnswers', adminController.renderViewAnswersPage);

// POST create question
router.post('/createQuestion', adminController.createQuestion);

// POST delete question
router.post('/deleteQuestion', adminController.deleteQuestion);

module.exports = router;
