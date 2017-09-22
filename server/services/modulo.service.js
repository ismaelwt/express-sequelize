Modulo = require('../models/').Modulo;
Empresa = require('../models/').Empresa;
Validations = require('./validation');
ScopeService = require('./scope.service');

module.exports = {
	createOrUpdate(req, res) {

		let modulo = Validations.validarEmpresa(req);
		ScopeService.setDefultScope(Modulo, req.user.dataValues.isAdmin, req.session.empresaId);
		
		if (req.query.id) {
			Modulo.update(modulo, {
				where: {
					id: modulo.id
				}
			})
				.then(function (updatedRecords) {
					res.status(200).json(updatedRecords);
				})
				.catch(function (error) {
					res.status(500).json(error);
				});
		} else {
			Modulo.create(modulo)
				.then(function (newModulo) {
					res.status(200).json(newModulo);
				})
				.catch(function (error) {
					res.status(500).json(error);
				});
		}
	},

	delete(req, res) {

		ScopeService.setDefultScope(Modulo, req.user.dataValues.isAdmin, req.session.empresaId);

		let id = req.query.id || req.params.id;

		Modulo.destroy({ where: { id: id } })
			.then(function (deletedRecords) {
				res.status(200).json(deletedRecords);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
	},
	findById(req, res) {

		ScopeService.setDefultScope(Modulo, req.user.dataValues.isAdmin, req.session.empresaId);

		let id = req.query.id || req.params.id;

		Modulo.findById(id, { include: Empresa })
			.then(function (Modulo) {
				res.status(200).json(Modulo);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
	},
	findAll(req, res) {
		
		ScopeService.setDefultScope(Modulo, req.user.dataValues.isAdmin, req.session.empresaId);

		Modulo.findAll({ include: Empresa })
			.then(function (Modulos) {
				res.status(200).json(Modulos);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
		
	}
}