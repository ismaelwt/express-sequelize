var express = require('express');
var router = express.Router();
var programa = require('../controllers/programa');

router.get('/', programa.index);
router.get('/:id', programa.show);
router.post('/', programa.create);
router.post('/:id', programa.update);
router.delete('/', programa.delete);

module.exports = router;
