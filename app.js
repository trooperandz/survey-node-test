'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('hbs');
var exphbs = require('express-handlebars');
var app = express();

// Establish routes
var indexRoute = require('./routes/index');
var userRoute = require('./routes/user');
var adminRoute = require('./routes/admin');

// Establish cookie expiration date
var date = new Date();
var cookieExpiration = date.setTime(date.getTime() + (7*24*60*60*1000));

// Session setup
// s%3A61imwV63JD_w11xE5XUHpNX_Qbkx1KLB.GwyRuEcUbQttNOhNoE4TRIzAFqiIXtJQD7h7%2B0hSzGU
// s%3ACe4CyyImpV-ASWXkleMzd3Q5dTsbt9mS.YalYhrsh89KnongW33NLzt7mowsKiJac31m%2Fe4vcSG0
// s%3ACe4CyyImpV-ASWXkleMzd3Q5dTsbt9mS.YalYhrsh89KnongW33NLzt7mowsKiJac31m%2Fe4vcSG0
// s%3A61imwV63JD_w11xE5XUHpNX_Qbkx1KLB.GwyRuEcUbQttNOhNoE4TRIzAFqiIXtJQD7h7%2B0hSzGU
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    name: 'survey.question',
    /*
    genid: function(req) {
        return genuuid();
    },*/
    secret: 'JDFKjdfjsl#$!dkjf#',
    resave: false,
    saveUninitialized: true,
    // Note: change to true when https is enabled
    cookie: {
        secure: false,
        httpOnly: false,
        expires: cookieExpiration
    },
    // Note: change to true when user is logged in.  Used for app access rules.
    authenticated: false,
    // Note: guestId will be set after IP address is processed
    guestId: false
}));

// Configure view engine
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
}));
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set routes
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/admin', adminRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
