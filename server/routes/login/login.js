var express = require('express');
var router = express.Router();
var Usuario = require('../../models/').Usuario;
var passport = require('passport');


router.post('/login', passport.authenticate('local-login'), function(req, res, next){
    console.log('passou por aqui login.js');
    req.session.permissoes = [{path: '/usuario', read: false, delete: false, insert: true}];
    res.json({ id: req.user.id, username: req.user.email, permissoes: req.session.permissoes });
});


/*router.post('/login', function(req, res, next){
    
   

    Usuario.findAll({
        where: {
          email: req.body.email
        }
      })
    .then(function (usuario) {

        if (usuario) {
            if (usuario[0].password === req.body.password) {
                req.session.key = usuario[0];
                res.status(200).json('usuario autenticado');
            }
        }
    })
    .catch(function (error){
      res.status(500).json(error);
    });
});*/

router.post('/logout', function(req, res, next){
    if(req.session.key) {
        req.session.destroy(function(){
            res.status(200).json('usuario deslogado');
        });
        } else {
        }
});


module.exports = router;
