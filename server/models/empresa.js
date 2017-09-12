'use strict';
module.exports = function(sequelize, DataTypes) {
  var Empresa = sequelize.define('Empresa', {
    name: DataTypes.STRING,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    _isRoot: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    classMethods: {
      associate: function(models) {
        Empresa.hasMany(models.GrupoDeModulo);
        Empresa.hasMany(models.Usuario);
      }
    }
  });
  return Empresa;
};