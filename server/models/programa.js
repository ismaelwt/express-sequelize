'use strict';
module.exports = function(sequelize, DataTypes) {
  var Programa = sequelize.define('Programa', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Programa.belongsToMany(models.Module,  { through: models.ModulePrograma });
      }
    }
  });
  return Programa;
};