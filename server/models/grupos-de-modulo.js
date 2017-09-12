'use strict';
module.exports = function(sequelize, DataTypes) {
  var GrupoDeModulo = sequelize.define('GrupoDeModulo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        GrupoDeModulo.hasMany(models.Modulo);
        GrupoDeModulo.belongsTo(models.Empresa, { foreignKey: 'EmpresaId' });
      }
    }
  });
  return GrupoDeModulo;
};