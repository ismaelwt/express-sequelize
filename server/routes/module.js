var express = require('express');
var router = express.Router();
var modulo = require('../controllers/module');

router.get('/', modulo.index);
router.get('/:id', modulo.show);
router.post('/', modulo.create);
router.delete('/', modulo.delete);

module.exports = router;
