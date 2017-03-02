var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
var services = require('../services/services');

// Form validation regex patterns
validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/,
// Minimum 8 characters, one uppercase, one lowercase, one special character and one number
validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/;

module.exports = {
    // Serve the manage users page
    renderIndexPage: function(req, res) {
        // Authenticate User
        if (!req.session.authenticated) {
            return res.render('forbidden');
        }
        res.render('users', { adminUser:req.session.firstName });
    },

    // Process user login
    loginUser: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        // Validate password. First, retrieve user record.
        // Note: fail == incorrect user; error == system error, success == validated user
        services.getUser(email).then(function(user) {
            if (!user) {
                res.send('fail');
            } else {
                var hash = user.dataValues.password;
                var name = user.dataValues.name;
                // Extract first name for navbar
                var firstName = name.split(' ')[0];

                // Validate password
                bcrypt.compare(password, hash, function(err, response) {
                    if (err) {
                        res.send('error');
                    } else if (response) {
                        // Set session info
                        req.session.firstName = firstName;
                        req.session.authenticated = true;
                        res.send('success');
                    } else if (!response) {
                        res.send('fail');
                    }
                });
            }
        });
    },

    // Process user logout
    logoutUser: function(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    // Process create new user
    createUser: function(req, res) {
        var name = req.body.registerName;
        var email = req.body.registerEmail;
        var password = req.body.registerPass;
        var ipAddress = req.ip;
        // New register user will always have admin access initially
        var admin = 1;

        // Validate form entries
        var errorArr = [];

        if(name == '') {
            errorArr.push('You entered an invalid Name. \n');
        }
        if(!validEmail.test(email)) {
            errorArr.push('You entered an invalid Email Address.');
        }
        if(!validPass.test(password)) {
            errorArr.push('Your password did not meet the minimum requirements.');
        }
        if(ipAddress == '') {
            errorArr.push('Your IP Address could not be retrieved.');
        }

        // Encrypt user password
        var hash = bcrypt.hashSync(password);

        // If there were errors, send back error messages
        if (errorArr.length > 0) {
            // Return user back to users page and display errors. Keep form inputs.
            return res.render('users', { name:name, email:email, password:password, errors:errorArr, adminUser:req.session.firstName })
        } else {
            // If no errors, insert new user into db, return user to users page and display success message
            services.insertUser(name, email, hash, ipAddress, admin).then(function(user) {
                var successMsg = 'Thank you, ' + name + ' was registered successfully!';
                return res.render('users', { successMsg:successMsg, adminUser:req.session.firstName });
            });
        }
    }
}
