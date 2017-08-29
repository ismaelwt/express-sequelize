/* imports for application */
var express = require('express');
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var client  = redis.createClient();
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var models = require('./server/models');
var passport = require('passport');
var flash    = require('connect-flash');
var app = express();

/* imports for application */



/* imports for routes 
var empresa = require('./server/routes/empresa'),
groupModule = require('./server/routes/group-module'),
mModule = require('./server/routes/module'),
programa = require('./server/routes/programa'),
login = require('./server/routes/login'),
usuario = require('./server/routes/usuario');
 imports for routes */



/* setup application */

app.use(cookieParser("secret"));
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(flash());
app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl :  120}),
  cookie: {secure: false, maxAge: 120000},
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.disable('x-powered-by');
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.frameguard());
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}));

/* setup application */


/* Setup Routes */

/*app.use('/empresa', empresa);
app.use('/group-module', groupModule);
app.use('/programa', programa);
app.use('/module', mModule);
app.use('/auth', login);
app.use('/usuario', usuario);*/



/* Setup Routes */

app.set('port', process.env.PORT || 8000);
require('./server/config/passport')(passport);
require('./server/routes/routes')(app, passport); // load our routes and pass in our app and fully configured passport

/*app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});*/

models.sequelize.sync({force: false}).then(function() {
  app.listen(app.get('port'), function () {
    console.log("Magic happens on port", app.get('port'));
  });
});



