UsuarioService = require('../services/usuario.service');

module.exports = {
  index(req, res) {
    UsuarioService.findAll(req, res);
  },

  show(req, res) {
    if (req.query.id || req.params.id) {
      UsuarioService.findById(req, res);
    }
  },

  create(req, res) {
    UsuarioService.createOrUpdate(req, res);
  },

  delete(req, res) {
    if (req.params.id) {
      UsuarioService.delete(req, res);
    }
  }
};
