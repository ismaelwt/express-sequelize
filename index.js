/* imports for application */
var express = require('express');

var redis = require('redis');
var client = redis.createClient();
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var helmet = require('helmet');
var models = require('./server/models');
var passport = require('passport');
var flash = require('connect-flash');
var app = express();
var cors = require('cors');
/* imports for application */

/* setup application */
app.set('secret', 'keyboard-cat');



var originsWhitelist = [
  'http://localhost:4200',
  'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'x-access-token'],
  exposedHeaders: ['Content-Type', 'x-access-token']
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
//app.set('trust proxy', 1);

app.use(session({
  secret: 'ssshhhhh',
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 900 }),
  cookie: { httpOnly: false },
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

/* setup application */


app.set('port', process.env.PORT || 8000);
require('./server/config/passport')(passport);
require('./server/routes/routes')(app, passport); // load our routes and pass in our app and fully configured passport

var path = __dirname + '/dist';

app.use(express.static(path));

app.get('*', function (req, res) {
  res.sendFile(path + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

models.sequelize.sync({ force: true }).then(function () {
  app.listen(app.get('port'), function () {
    console.log("Magic happens on port", app.get('port'));
  });
});



