'use strict';
module.exports = function(sequelize, DataTypes) {
  var Empresa = sequelize.define('Empresa', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Empresa.hasMany(models.GroupModule, {
          onDelete: 'cascade'
        });
      }
    }
  });
  return Empresa;
};