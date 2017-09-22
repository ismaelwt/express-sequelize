GrupoDeModulo = require('../models/').GrupoDeModulo;
Empresa = require('../models/').Empresa;
Validations = require('./validation');
ScopeService = require('./scope.service');

module.exports = {
	createOrUpdate(req, res) {

		let GrupoDeModulo = Validations.validarEmpresa(req);
		ScopeService.setDefultScope(GrupoDeModulo, req.user.dataValues.isAdmin, req.session.empresaId);
		
		if (req.query.id) {
			GrupoDeModulo.update(GrupoDeModulo, {
				where: {
					id: GrupoDeModulo.id
				}
			})
				.then(function (updatedRecords) {
					res.status(200).json(updatedRecords);
				})
				.catch(function (error) {
					res.status(500).json(error);
				});
		} else {
			GrupoDeModulo.create(GrupoDeModulo)
				.then(function (newGrupoDeModulo) {
					res.status(200).json(newGrupoDeModulo);
				})
				.catch(function (error) {
					res.status(500).json(error);
				});
		}
	},

	delete(req, res) {

		ScopeService.setDefultScope(GrupoDeModulo, req.user.dataValues.isAdmin, req.session.empresaId);

		let id = req.query.id || req.params.id;

		GrupoDeModulo.destroy({ where: { id: id } })
			.then(function (deletedRecords) {
				res.status(200).json(deletedRecords);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
	},
	findById(req, res) {

		ScopeService.setDefultScope(GrupoDeModulo, req.user.dataValues.isAdmin, req.session.empresaId);

		let id = req.query.id || req.params.id;

		GrupoDeModulo.findById(id, { include: Empresa })
			.then(function (GrupoDeModulo) {
				res.status(200).json(GrupoDeModulo);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
	},
	findAll(req, res) {
		
		ScopeService.setDefultScope(GrupoDeModulo, req.user.dataValues.isAdmin, req.session.empresaId);

		GrupoDeModulo.findAll({ include: Empresa })
			.then(function (GrupoDeModulos) {
				res.status(200).json(GrupoDeModulos);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
		
	}
}