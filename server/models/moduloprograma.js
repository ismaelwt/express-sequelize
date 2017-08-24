'use strict';
module.exports = function(sequelize, DataTypes) {
  var ModulePrograma = sequelize.define('ModulePrograma', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        ModulePrograma.belongsTo(models.Module);
        ModulePrograma.belongsTo(models.Programa);
      }
    }
  });
  return ModulePrograma;
};