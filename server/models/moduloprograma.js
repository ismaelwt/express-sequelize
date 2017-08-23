'use strict';
module.exports = function(sequelize, DataTypes) {
  var ModulePrograma = sequelize.define('ModulePrograma', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return ModulePrograma;
};