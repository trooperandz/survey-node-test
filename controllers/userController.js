var models = require('../models'),
    bcrypt = require('bcrypt-nodejs'),
    services = require('../services/services');

// Form validation regex patterns
validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/,
// Minimum 8 characters, one uppercase, one lowercase, one special character and one number
validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/;

module.exports = {
    renderIndexPage: function(req, res) {
        res.render('users');
    },

    loginUser: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        console.log('login inputs: ' + email + ' ' + password);

        // Validate password. First, retrieve user record.
        // Note: fail == incorrect user; error == system error, success == validated user
        services.getUser(email).then(function(user) {
            console.log('user: ' , user);
            if (!user) {
                console.log('user was not found');
                res.send('fail');
            } else {
                var hash = user.dataValues.password;

                // Validate password
                bcrypt.compare(password, hash, function(err, response) {
                    if (err) {
                        res.send('error');
                    } else if (response) {
                        console.log('Password validated!');
                        res.send('success');
                    } else if (!response) {
                        console.log('Password did not pass!')
                        res.send('fail');
                    }
                });
            }
        });
    },

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
            console.log('errors happened');
            // Return user back to users page and display errors. Keep form inputs.
            return res.render('users', { name:name, email:email, password:password, errors:errorArr })
        } else {
            // If no errors, insert new user into db, return user to users page and display success message
            services.insertUser(name, email, hash, ipAddress, admin).then(function(user) {
                var successMsg = 'Thank you, ' + name + ' was registered successfully!';
                return res.render('users', { successMsg:successMsg });
            });
        }
    }
}
