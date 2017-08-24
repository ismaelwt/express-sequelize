Programa = require('../models/').Programa;
ModulePrograma = require('../models/').ModulePrograma;

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
    Programa.create(req.body)
      .then(function (newPrograma) {

        if (Array.isArray(req.body.ModuleId)) {

          var list = [];

          for (var i = 0; i < req.body.ModuleId.length; i++) {

            var obj = { ProgramaId: newPrograma.id, ModuleId: req.body.ModuleId[i] }
            list.push(obj);
          }

          ModulePrograma
            .bulkCreate(list)
            .then(function (newModulePrograma) {
              res.status(200).json({ programa: newPrograma, ModulePrograma: newModulePrograma });
            }).catch(function (err) {
              res.status(500).json(err);
            });
        } else {
          ModulePrograma
            .bulkCreate({ ProgramaId: newPrograma.id, ModuleId: req.body.ModuleId })
            .then(function (newModulePrograma) {
              res.status(200).json({ programa: newPrograma, ModulePrograma: newModulePrograma });
            }).catch(function (err) {
              res.status(500).json(err);
            });
        }
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Programa.findById(req.params.id, { include: ModulePrograma })
      .then(function (programa) {
        ModulePrograma.destroy({ where: { ProgramaId: programa.id } }).then(function () {


          if (Array.isArray(req.body.ModuleId)) {

            var list = [];

            for (var i = 0; i < req.body.ModuleId.length; i++) {

              var obj = { ProgramaId: programa.id, ModuleId: req.body.ModuleId[i] }
              list.push(obj);
            }

            ModulePrograma
              .bulkCreate(list)
              .then(function (newModulePrograma) {
                res.status(200).json({ programa: programa, ModulePrograma: newModulePrograma });
              }).catch(function (err) {
                res.status(500).json(err);
              });
          } else {
            ModulePrograma
              .create({ ProgramaId: programa.id, ModuleId: req.body.ModuleId })
              .then(function (newModulePrograma) {
                res.status(200).json({ programa: programa, ModulePrograma: newModulePrograma });
              }).catch(function (err) {
                res.status(500).json(err);
              });
          }


        }).catch(function (err) {
          res.status(500).json(err);
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
