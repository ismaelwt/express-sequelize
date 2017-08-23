'use strict';
module.exports = function(sequelize, DataTypes) {
  var Module = sequelize.define('ModuleExemplo', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Module;
};