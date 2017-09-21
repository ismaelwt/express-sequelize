Empresa = require('../models/').Empresa;

module.exports = {
	createOrUpdate (req, res) {
		if (req.query.id) {
		    Empresa.update(req.body, {
		      where: {
		        id: req.query.id
		      }
		    })
		    .then(function (updatedRecords) {
		      res.status(200).json(updatedRecords);
		    })
		    .catch(function (error) {
		       res.status(500).json(error);
		    });
		} else {
		    Empresa.create(req.body)
		    .then(function (newEmpresa) {
		       req.body.usuario.EmpresaId = newEmpresa.id;
			    Usuario.create(req.body.usuario).then(function (newUser) {
			        if (newUser) {
			            res.status(200).json(newUser);
			        }
			    })
		    })
		    .catch(function (error) {
		        res.status(500).json(error);
		    });
	    }
	},

	delete(req, res) {
		
		let id = req.query.id || req.params.id;

		Empresa.destroy({
	      where: {
	        id: id
	      }
	    })
	    .then(function (deletedRecords) {
	      res.status(200).json(deletedRecords);
	    })
	    .catch(function (error) {
	      res.status(500).json(error);
	    });
	},
	findById (req, res) {

		let id = req.query.id || req.params.id;

		Empresa.findById(id)
	    .then(function (empresa) {
	      res.status(200).json(empresa);
	    })
	    .catch(function (error) {
	      res.status(500).json(error);
	    });
	},
	findAll(req, res) {
		Empresa.findAll()
	    .then(function (empresas) {
	      res.status(200).json(empresas);
	    })
	    .catch(function (error) {
	      res.status(500).json(error);
	    });
	}
}