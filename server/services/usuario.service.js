Usuario = require('../models/').Usuario;
Empresa = require('../models/').Empresa;
Validations = require('./validation');
ScopeService = require('./scope.service');

module.exports = {
	createOrUpdate(req, res) {

		let user = Validations.validarEmpresa(req);
		ScopeService.setDefultScope(Usuario, req.user.dataValues.isAdmin, req.session.empresaId);
		
		if (req.query.id) {
			Usuario.update(user, {
				where: {
					id: user.id
				}
			})
				.then(function (updatedRecords) {
					res.status(200).json(updatedRecords);
				})
				.catch(function (error) {
					res.status(500).json(error);
				});
		} else {
			Usuario.create(user)
				.then(function (newUsuario) {
					res.status(200).json(newUsuario);
				})
				.catch(function (error) {
					res.status(500).json(error);
				});
		}
	},

	delete(req, res) {

		ScopeService.setDefultScope(Usuario, req.user.dataValues.isAdmin, req.session.empresaId);

		let id = req.query.id || req.params.id;

		Usuario.destroy({ where: { id: id } })
			.then(function (deletedRecords) {
				res.status(200).json(deletedRecords);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
	},
	findById(req, res) {

		ScopeService.setDefultScope(Usuario, req.user.dataValues.isAdmin, req.session.empresaId);

		let id = req.query.id || req.params.id;

		Usuario.findById(id, { include: Empresa })
			.then(function (usuario) {
				res.status(200).json(usuario);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
	},
	findAll(req, res) {
		
		ScopeService.setDefultScope(Usuario, req.user.dataValues.isAdmin, req.session.empresaId);

		Usuario.findAll({ include: Empresa })
			.then(function (usuarios) {
				res.status(200).json(usuarios);
			})
			.catch(function (error) {
				res.status(500).json(error);
			});
		
	}
}