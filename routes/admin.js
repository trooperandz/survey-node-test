var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

// GET main page
router.get('/', adminController.renderIndexPage);

// GET addQuestion page
router.get('/addQuestionForm', adminController.renderCreateQuestionPage);

// POST create question
router.post('/createQuestion', adminController.createQuestion);

module.exports = router;
