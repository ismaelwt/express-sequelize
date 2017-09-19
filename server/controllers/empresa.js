Empresa = require('../models/').Empresa;
GrupoDeModulo = require('../models/').GrupoDeModulo;
Modulo = require('../models/').Modulo;
Usuario = require('../models/').Usuario;
Programa = require('../models/').Programa;

module.exports= {
  index(req, res) {
    Empresa.findAll()
      .then(function (Empresas) {
        
        res.status(200).json(Empresas);
        
        
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Empresa.findById(req.params.id)
    .then(function (Empresa) {
      res.status(200).json(Empresa);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    Empresa.create(req.body)
      .then(function (newEmpresa) {


        req.body.usuario.EmpresaId = newEmpresa.id;

        Usuario.create(req.body.usuario).then(function(newUser){
          if (newUser) {
            res.status(200).json(newUser);
          }
        })
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Empresa.update(req.body, {
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
    Empresa.destroy({
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
