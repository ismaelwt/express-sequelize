module.exports = {
	setDefultScope(_model, _isAdmin, _idEmpresa) {
		let defaultScope = {};
		if (!_isAdmin) {
			 defaultScope = { where: { EmpresaId: _idEmpresa}};
			 _model.addScope('defaultScope', defaultScope, {override: true});
		}
	}
}