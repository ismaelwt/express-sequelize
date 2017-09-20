var express = require('express');
var router = express.Router();
var cidade = require('../../controllers/cidade');

router.get('/', cidade.index);
router.get('/:id', cidade.show);
router.post('/', cidade.create);
router.delete('/:id', cidade.delete);

module.exports = router;
