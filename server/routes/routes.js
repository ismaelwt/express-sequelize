var empresa = require('./empresas/empresa');
var usuario = require('./usuarios/usuario');
var login = require('./login/login');
var jwt = require('jsonwebtoken');

module.exports = function (app, passport) {


    app.use('/empresa', isLoggedIn, empresa);
    app.use('/usuario', usuario);
    app.use('/auth', login);
};

function isLoggedIn(req, res, next) {
    if (req.session) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, req.app.get('secret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    //req.decoded = decoded;
                    next();
                }
            });
        }
    }else {
        res.json({ success: false, message: 'Failed to authenticate token.' });
    }
}