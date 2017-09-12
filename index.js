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
var cors = require('cors');
var app = express();

/* imports for application */


/* setup application */
app.use(cors());
app.set('secret', 'keyboard-cat');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header('Access-Control-Expose-Headers', 'x-access-token');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
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

app.use(function(req,res,next){
  var _send = res.send;
  var sent = false;
  res.send = function(data){
      if(sent) return;
      _send.bind(res)(data);
      sent = true;
  };
  next();
});

/* setup application */


app.set('port', process.env.PORT || 8000);
require('./server/config/passport')(passport);
require('./server/routes/routes')(app, passport); // load our routes and pass in our app and fully configured passport

var path = __dirname + '/dist';

app.use(express.static(path));

app.get('*', function (req, res) {
  console.log(path + ' <---');
  res.sendFile(path + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

models.sequelize.sync({force: true}).then(function() {
  app.listen(app.get('port'), function () {
    console.log("Magic happens on port", app.get('port'));
  });
});



