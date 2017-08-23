GroupModule = require('../models/').GroupModule;
Module = require('../models/').Module;

module.exports= {
  index(req, res) {
    GroupModule.findAll({ include : Module})
      .then(function (GroupModules) {
        res.status(200).json(GroupModules);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    GroupModule.findById(req.params.id)
    .then(function (GroupModule) {
      res.status(200).json(GroupModule);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    GroupModule.create(req.body)
      .then(function (newGroupModule) {
        res.status(200).json(newGroupModule);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    GroupModule.update(req.body, {
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
    GroupModule.destroy({
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
