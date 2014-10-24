var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//
var routes = require('./routes/index');
var ejs = require('ejs');

var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = require('./database/msession');
var Settings = require('./database/settings');

var app = express();

app.engine('html',ejs.renderFile);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
    cookie: { maxAge: 60000 * 20}, //20min
    resave: true,
    saveUninitialized: true,
    secret: Settings.COOKIE_SECRET
    // store: new MongoStore({
    //     db:db,
    //     host:Settings.HOST,
    //     port:Settings.PORT,
    //     username:Settings.USERNAME,
    //     password:Settings.PASSWORD,
    //     auto_reconnect:true
    // })
}));



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

app.use('/url/that/accepts/form-data', multipartMiddleware);

app.use('/', routes);
app.use('/reg', routes);
app.use('/login', routes);
app.use('/loginout', routes);
app.use('/home', routes);

app.use(function(req, res, next){    
    res.locals.user = req.session.user;
    console.dir(res.locals.user);
    var err = req.session.error;
    delete req.session.error;
    if (err) {
        res.locals.message = '<div class="alert alert-warning">' + err + '</div>';
        console.log(res.locals.message);
    }
    next();
});

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title :'出现异常,'+ env,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
       title: '出现异常！'+ err.status,
       message: err.message,
       error: {}
   });
});

module.exports = app;
