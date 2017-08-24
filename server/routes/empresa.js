var express = require('express');
var router = express.Router();
var empresa = require('../controllers/empresa');

router.get('/', empresa.index);
router.get('/:id', empresa.show);
router.post('/', empresa.create);
router.delete('/', empresa.delete);

module.exports = router;
