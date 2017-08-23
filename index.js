var app = require('express')(),
authors = require('./server/controllers/authors'),
books = require('./server/controllers/books'),
empresa = require('./server/controllers/empresa'),
groupModule = require('./server/controllers/groupModules'),
mModule = require('./server/controllers/module'),
bodyParser = require('body-parser');

app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded


var models = require('./server/models');

app.get('/authors', authors.index);
app.get('/authors/:id', authors.show);
app.post('/authors', authors.create);
app.put('/authors', authors.update);
app.delete('/authors', authors.delete);

app.get('/books', books.index);
app.get('/books/:id', books.show);
app.post('/books', books.create);
app.delete('/books', books.delete);

app.get('/empresa', empresa.index);
app.get('/empresa/:id', empresa.show);
app.post('/empresa', empresa.create);
app.put('/empresa', empresa.update);
app.delete('/empresa', empresa.delete);

app.get('/group-module', groupModule.index);
app.get('/group-module/:id', groupModule.show);
app.post('/group-module', groupModule.create);
app.put('/group-module', groupModule.update);
app.delete('/group-module', groupModule.delete);

app.get('/module', mModule.index);
app.get('/module/:id', mModule.show);
app.post('/module', mModule.create);
app.put('/module', mModule.update);
app.delete('/module', mModule.delete);


app.set('port', process.env.PORT || 8000);

models.sequelize.sync().then(function() {
  app.listen(app.get('port'), function () {
    console.log("Magic happens on port", app.get('port'));
  });
});



