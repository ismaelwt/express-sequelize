'use strict';
module.exports = function (sequelize, DataTypes) {
  var Produto = sequelize.define('Produto', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    nome: DataTypes.STRING
  }, {
      freezeTableName: true,
      paranoid: true,
      classMethods: {
        associate: function (models) {
          Produto.belongsTo(models.GrupoDeModulo, { foreignKey: 'GrupoDeModuloId' });
          Produto.belongsTo(models.Empresa, { foreignKey: 'EmpresaId' });
        }
      }
    });
  return Produto;
};