var express = require('express');
var router = express.Router();
var grupo = require('../../controllers/grupo-de-modulo');

router.get('/', grupo.index);
router.get('/:id', grupo.show);
router.post('/', grupo.create);
router.delete('/', grupo.delete);


module.exports = router;
