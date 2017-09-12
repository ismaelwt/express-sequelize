var express = require('express');
var router = express.Router();

var Usuario = require('../models/').Usuario;
var GrupoDeModulo = require('../models/').GrupoDeModulo;
var Modulo = require('../models/').Modulo;
var Programa = require('../models/').Programa;
var Empresa = require('../models/').Empresa;


router.post('/init', function (req, res, next) {

    Empresa
        .findOrCreate({ where: { name: '_root', _isRoot: true} })
        .spread((empresa, created) => {
            Usuario.findOrCreate({ where: { name: 'Admin', email: 'admin@admin.com', password: '123456', EmpresaId: empresa.id, isAdmin: true } })
                .spread((usuario, created) => {
                });

            GrupoDeModulo.findOrCreate({ where: { name: 'Grupos de Modulo ADMIN', EmpresaId: empresa.id } })
                .spread((gpModulo, created) => {
                    Modulo.findOrCreate({ where: { name: 'Modulo 1', GrupoDeModuloId: gpModulo.id } })
                        .spread((pModulo, created) => {
                            Programa.findOrCreate({ where: { name: 'Programa 1'} })
                            .spread((programa, created) => {
                                programa.addModulos(pModulo);
                                res.json({success: true, message: 'All Created'});
                            });
                            //res.json(usuario);
                        });
                });
        });
});

module.exports = router;
