GrupoDeModuloService = require('../services/grupo-de-module.service');


module.exports = {
  index(req, res) {
    GrupoDeModuloService.findAll(req, res);
  },

  show(req, res) {
    if (req.query.id || req.params.id) {
      GrupoDeModuloService.findById(req, res);
    }
  },

  create(req, res) {
    GrupoDeModuloService.createOrUpdate(req, res);
  },

  delete(req, res) {
    if (req.params.id) {
      GrupoDeModuloService.delete(req, res);
    }
  }
};
