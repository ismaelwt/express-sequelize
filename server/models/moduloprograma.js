'use strict';
module.exports = function(sequelize, DataTypes) {
  var ModulePrograma = sequelize.define('ModulePrograma', {
    name: DataTypes.STRING
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