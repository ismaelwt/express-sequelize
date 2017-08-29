Usuario = require('../models/').Usuario;

module.exports= {
  index(req, res) {
    Usuario.findAll()
      .then(function (Usuarios) {
        
        res.status(200).json(Usuarios);  
        
        
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Usuario.findById(req.params.id)
    .then(function (Usuario) {
      res.status(200).json(Usuario);
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
