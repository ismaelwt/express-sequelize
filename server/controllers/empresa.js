EmpresaService = require('../services/empresa.service');

module.exports = {
  index(req, res) {
    EmpresaService.findAll(req, res);
  },

  show(req, res) {
    if (req.query.id || req.params.id) {
      EmpresaService.findById(req, res);
    }
  },

  create(req, res) {
    EmpresaService.createOrUpdate(req, res);
  },

  delete(req, res) {
    if (req.params.id) {
      EmpresaService.delete(req, res);
    }
  }
};
