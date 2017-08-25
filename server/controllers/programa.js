Programa = require('../models/').Programa;
Module = require('../models/').Module;

module.exports = {
  index(req, res) {
    Programa.findAll()
      .then(function (Programas) {
        res.status(200).json(Programas);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Programa.findById(req.params.id)
      .then(function (Programa) {
        res.status(200).json(Programa);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  create(req, res) {

    Programa.create(req.body).then(function (createdProgram) {

      Module.findAll({ where: { id: req.body.ModuleId } })
        .then(function (mModules) {
          createdProgram.addModules(mModules);
          res.status(200).json('OK')
        })

    }).catch(function (err) {
      res.status(200).json(err)
    })
  },

  update(req, res) {
    Programa.findById(req.params.id)
      .then(function (programa) {
        Module.findAll({ where: { id: req.body.ModuleId } })
          .then(function (mModules) {
            programa.setModules(mModules);
            res.status(200).json('OK')
          })
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  delete(req, res) {
    Programa.destroy({
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


function helper(newProgram, array) {
  arr = [];
  for (var index = 0; index < array.length; index++) {
    var obj = { ProgramaId: newProgram.id, ModuleId: array[index] }
    arr.push(obj);
  }
  return arr;
}