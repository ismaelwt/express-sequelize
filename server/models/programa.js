'use strict';
module.exports = function (sequelize, DataTypes) {
  var Programa = sequelize.define('Programa', {
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
          Programa.belongsToMany(models.Modulo, { through: 'ModuloPrograma' });
          Programa.belongsTo(models.Empresa, { foreignKey: 'EmpresaId' })
        }
      }
    });
  return Programa;
};