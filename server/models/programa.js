'use strict';
module.exports = function(sequelize, DataTypes) {
  var Programa = sequelize.define('Programa', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Programa.hasMany(models.ModulePrograma, { onUpdate: 'cascade'});
      }
    }
  });
  return Programa;
};