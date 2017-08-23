Module = require('../models/').Module;
GroupModuleHasModule = require('../models/').GroupModuleHasModule;

module.exports = {
  index(req, res) {
    Module.findAll()
      .then(function (Modules) {
        res.status(200).json(Modules);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Module.findById(req.params.id)
      .then(function (Module) {
        res.status(200).json(Module);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  create(req, res) {
    Module.create(req.body)
      .then(function (newModule) {
        console.log(newModule.dataValues)
        res.status(200).json(newModule);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Module.update(req.body, {
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
    Module.destroy({
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
