Usuario = require('../models/').Usuario;
Empresa = require('../models/').Empresa;


module.exports= {
  index(req, res) {
    Usuario.findAll({ include : Empresa})
      .then(function (usuarios) {
        res.status(200).json(usuarios);
        
        
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Usuario.findById(req.params.id, { include : Empresa })
    .then(function (usuario) {
      res.status(200).json(usuario);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    Usuario.create(req.body)
      .then(function (newUsuario) {
        res.status(200).json(newUsuario);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Usuario.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    Usuario.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
