Programa = require('../models/').Programa;
ModulePrograma = require('../models/').ModulePrograma;

module.exports= {
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
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    Programa.create(req.body)
      .then(function (newPrograma) {
        ModulePrograma
        .create({ProgramaId: newPrograma.id, ModuleId: req.body.ModuleId})
        .then(function(newModulePrograma){
          res.status(200).json({programa: newPrograma, ModulePrograma: newModulePrograma});
        });
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Programa.update(req.body, {
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
    Programa.destroy({
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
