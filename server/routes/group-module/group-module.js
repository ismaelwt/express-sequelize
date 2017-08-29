var express = require('express');
var router = express.Router();
var groupModule = require('../controllers/groupModules');

router.get('/', groupModule.index);
router.get('/:id', groupModule.show);
router.post('/', groupModule.create);
router.delete('/', groupModule.delete);


module.exports = router;
