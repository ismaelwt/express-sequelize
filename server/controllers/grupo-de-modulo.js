Grupo = require('../models/').GrupoDeModulo;
Module = require('../models/').Module;

module.exports= {
  index(req, res) {
    Grupo.findAll({ include : Module})
      .then(function (_grupos) {
        res.status(200).json(_grupos);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Grupo.findById(req.params.id)
    .then(function (_grupo) {
      res.status(200).json(_grupo);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    Grupo.create(req.body)
      .then(function (newGrupo) {
        res.status(200).json(newGrupo);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Grupo.update(req.body, {
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
    Grupo.destroy({
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
