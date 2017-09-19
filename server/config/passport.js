var LocalStrategy = require('passport-local').Strategy;
var User = require('../models').Usuario;
var Empresa = require('../models').Empresa;
var bcrypt = require('bcrypt');

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            done(null, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        function (req, pEmail, password, done) {
            if (pEmail)
                pEmail = pEmail.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                User.findOne({ where: { email: pEmail }, include: [Empresa] }).then(function (user) {
                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, { success: false, message: 'Usuário, não encontrado.' });

                    if (!bcrypt.compareSync(password, user.password))
                        return done(null, false, { success: false, message: 'Oops! Senha incorreta.' });

                    if (!user.getEmpresa())
                        return done(null, false, { success: false, message: 'Oops! O Usuário sem empresa.' });

                    else
                        return done(null, user);
                });
            });

        }));

}