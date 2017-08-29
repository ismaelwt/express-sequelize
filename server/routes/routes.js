var empresa = require('./empresas/empresa');
var usuario = require('./usuarios/usuario');
var login = require('./login/login');

module.exports = function (app, passport) {


    app.use('/empresa', empresa);
    app.use('/usuario', isLoggedIn, usuario);
    app.use('/auth', login);


    app.get('/', function (req, res) {
        res.json('index');
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.json('nao autenticado');
}