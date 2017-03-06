'use strict';

var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

// GET home page.  Generate question for visitor(guest)
router.get('/', indexController.renderIndexPage);

// POST guest survey selection
router.post('/processSurveySelection', indexController.processSurveySelection);

module.exports = router;
