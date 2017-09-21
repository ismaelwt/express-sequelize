var express = require('express');
var router = express.Router();
var Usuario = require('../../models/').Usuario;
var passport = require('passport');
var jwt = require('jsonwebtoken');


router.post('/login', function (req, res, next) {

    passport.authenticate('local-login', function (err, user, info) {
        if (info) return res.json(info.message);

        req.logIn(user, function (err) {
            req.session.key = user;
            req.session.empresaId = user.Empresa.id;
            req.session.save(function () {
                if (err) { return next(err); }
                return res.json(gerarToken(user, req, res));
            });
        });

    })(req, res, next);
});

router.post('/logout', function (req, res, next) {
    if (req.session.key) {
        req.session.destroy(function () {
            res.status(200).json('usuario deslogado');
        });
    } else {
    }
});

function gerarToken(user, req, res) {
    var tmpUser = { email: user.email, password: user.password, name: user.nome, Empresa: user.Empresa }
    var pToken = jwt.sign(tmpUser, req.app.get('secret'));
    res.cookie('sessionid', req.session.id, { httpOnly: false });
    res.set('x-access-token', pToken);
    return user;
};

module.exports = router;
