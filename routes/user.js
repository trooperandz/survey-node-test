'use strict';

var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

// GET main index page
router.get('/', userController.renderIndexPage);

// POST create user
router.post('/create', userController.createUser);

// POST login user
router.post('/login', userController.loginUser);

// GET logout user
router.get('/logout', userController.logoutUser);

module.exports = router;
