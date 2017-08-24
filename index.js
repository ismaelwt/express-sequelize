/* imports for application */
var app = require('express')(),
groupModule = require('./server/controllers/groupModules'),
mModule = require('./server/controllers/module'),
bodyParser = require('body-parser'),
models = require('./server/models');
/* imports for application */



/* imports for routes */
var empresa = require('./server/routes/empresa'),
groupModule = require('./server/routes/group-module'),
mModule = require('./server/routes/module'),
programa = require('./server/routes/programa');
/* imports for routes */



/* setup application */
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
/* setup application */


/* Setup Routes */

app.use('/empresa', empresa);
app.use('/group-module', groupModule);
app.use('/programa', programa);
app.use('/module', mModule);

/* Setup Routes */

app.set('port', process.env.PORT || 8000);

models.sequelize.sync({froce: true}).then(function() {
  app.listen(app.get('port'), function () {
    console.log("Magic happens on port", app.get('port'));
  });
});



