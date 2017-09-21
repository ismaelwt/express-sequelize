module.exports = {
	validarEmpresa (req) {
		let model = req.session.key;

		if (!req.body.Empresa || !req.body.EmpresaId) {
			req.body.Empresa = model.Empresa ;
			return model;
		}else {
			return req.body;
		}
	}
}