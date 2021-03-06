var empresa = require('./empresas/empresa');
var usuario = require('./usuarios/usuario');
var login = require('./login/login');
var grupoDeModulo = require('./grupos-de-modulo/grupo-de-modulo');
var modulo = require('./modulo/modulo');
var jwt = require('jsonwebtoken');

//Seed options
var seed =  require('.././seeders/seed');

module.exports = function (app, passport) {
    
    app.use('/empresa', isLoggedIn, empresa);
    app.use('/grupo-de-modulo', isLoggedIn, grupoDeModulo);
    app.use('/modulo', isLoggedIn, modulo);
    app.use('/usuario', usuario);
    app.use('/auth', login);
    app.use('/app', seed);
};

function isLoggedIn(req, res, next) {
    if (req.session) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {

            jwt.verify(token, req.app.get('secret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Falha de autenticação do token.' });
                } else {

                    if(req.isAuthenticated() && req.cookies.sessionid === req.session.id){
                        next();
                    }else {
                        res.status(401).json({ success: false, message: 'Falha de autenticação do token.' });
                    }
                }
            });
        }
    } else {
        res.status(401).json({ success: false, message: 'Falha de autenticação do token.' });
    }
}