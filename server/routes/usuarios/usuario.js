var express = require('express');
var router = express.Router();
var usuario = require('../../controllers/usuario');

router.get('/', usuario.index);
router.get('/:id', usuario.show);
router.post('/', usuario.create);
router.delete('/', usuario.delete);

module.exports = router;

function permRead(req, res, next) {
    var arr = req.session.permissoes.filter(function (val, index, arr) {
        if (val.path === req.baseUrl)
            return true;
        else
            return false;
    });

    console.log(arr);

    if (arr[0].read && req.url === '/') {
        return next();
    }else {
        res.json('Usuario não tem permissão para ver os registros')
    }
}

function permDelete(req, res, next) {
    var arr = req.session.permissoes.filter(function (val, index, arr) {
        if (val.path === req.baseUrl)
            return true;
        else
            return false;
    });

    console.log(arr);

    if (arr[0].read && req.url === '/') {
        return next();
    }else {
        res.json('Usuario não tem permissão para excluir registros')
    }

} 

function permInsert(req, res, next) {
    var arr = req.session.permissoes.filter(function (val, index, arr) {
        if (val.path === req.baseUrl)
            return true;
        else
            return false;
    });

    console.log(arr);

    if (arr[0].insert && req.url === '/') {
        return next();
    }else {
        res.json('Usuario não tem permissão para inserir registros')
    }

}