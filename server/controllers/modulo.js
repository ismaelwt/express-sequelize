ModuloService = require('../services/modulo.service');

module.exports = {
  index(req, res) {
    ModuloService.findAll(req, res);
  },

  show(req, res) {
    if (req.query.id || req.params.id) {
      ModuloService.findById(req, res);
    }
  },

  create(req, res) {
    ModuloService.createOrUpdate(req, res);
  },

  delete(req, res) {
    if (req.params.id) {
      ModuloService.delete(req, res);
    }
  }
};
