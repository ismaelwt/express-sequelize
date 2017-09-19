var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var Usuario = require('../models/').Usuario;
var GrupoDeModulo = require('../models/').GrupoDeModulo;
var Modulo = require('../models/').Modulo;
var Programa = require('../models/').Programa;
var Empresa = require('../models/').Empresa;
var Cidade = require('../models/').Cidade;


router.post('/init', function (req, res, next) {

    Cidade.findOrCreate({ where: { nome: 'Joinville' } })
        .spread((cidade, created) => {
            Empresa
                .findOrCreate({ where: { nome: '_root', _isRoot: true, CidadeId: cidade.id } })
                .spread((empresa, created) => {

                    Usuario.findOrCreate({ where: { nome: 'Admin', email: 'admin@admin.com', password: bcrypt.hashSync('123456', 10), EmpresaId: empresa.id, isAdmin: true } })
                        .spread((usuario, created) => {
                            console.log(usuario);
                        });

                    GrupoDeModulo.findOrCreate({ where: { nome: 'Grupos de Modulo ADMIN', EmpresaId: empresa.id } })
                        .spread((gpModulo, created) => {
                            Modulo.findOrCreate({ where: { nome: 'Modulo 1', GrupoDeModuloId: gpModulo.id } })
                                .spread((pModulo, created) => {
                                    Programa.findOrCreate({ where: { nome: 'Programa 1' } })
                                        .spread((programa, created) => {
                                            programa.addModulos(pModulo);
                                            res.json({ success: true, message: 'All Created' });
                                        });
                                });
                        });
                });
        });
});

module.exports = router;
