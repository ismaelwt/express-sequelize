Cidade = require('../models/').Cidade;

module.exports= {
  index(req, res) {
    Cidade.findAll()
      .then(function (cidades) {
        
        res.status(200).json(cidades);
        
        
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Cidade.findById(req.params.id)
    .then(function (cidade) {
      res.status(200).json(cidade);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    Cidade.create(req.body)
      .then(function (newCidade) {
        res.status(200).json(newCidade);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Cidade.update(req.body, {
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
    Cidade.destroy({
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
