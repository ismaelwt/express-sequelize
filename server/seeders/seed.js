var express = require('express');
var router = express.Router();

var Usuario = require('../models/').Usuario;
var GroupModule = require('../models/').GroupModule;
var Module = require('../models/').Module;
var Programa = require('../models/').Programa;
var Empresa = require('../models/').Empresa;


router.post('/init', function (req, res, next) {

    Empresa
        .findOrCreate({ where: { name: '_root', _isRoot: true} })
        .spread((empresa, created) => {
            Usuario.findOrCreate({ where: { name: 'Admin', email: 'admin@admin.com', password: '123456', EmpresaId: empresa.id, isAdmin: true } })
                .spread((usuario, created) => {
                });

            GroupModule.findOrCreate({ where: { name: 'Grupos de Modulo ADMIN', EmpresaId: empresa.id } })
                .spread((gpModule, created) => {
                    Module.findOrCreate({ where: { name: 'Modulo 1', GroupModuleId: gpModule.id } })
                        .spread((pModule, created) => {
                            Programa.findOrCreate({ where: { name: 'Programa 1'} })
                            .spread((programa, created) => {
                                programa.addModules(pModule);
                                res.json({success: true, message: 'All Created'});
                            });
                            //res.json(usuario);
                        });
                });
        });
});

module.exports = router;
