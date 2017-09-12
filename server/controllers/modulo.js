Modulo = require('../models/').Modulo;

Modulo.exports = {
  index(req, res) {
    Modulo.findAll()
      .then(function (_modulos) {
        res.status(200).json(_modulos);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Modulo.findById(req.params.id)
      .then(function (_modulo) {
        res.status(200).json(_modulo);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  create(req, res) {
    Modulo.create(req.body)
      .then(function (newModulo) {
        console.log(newModulo.dataValues)
        res.status(200).json(newModulo);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Modulo.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(function (updatedRecords) {
        res.status(200).json(updatedRecords);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  delete(req, res) {
    Modulo.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (deletedRecords) {
        res.status(200).json(deletedRecords);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  }
};
