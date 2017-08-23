'use strict';
module.exports = function(sequelize, DataTypes) {
  var Module = sequelize.define('Module', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Module.belongsTo(models.GroupModule,  {
          onDelete: 'cascade'
        });
        Module.hasMany(models.Programa, {
          onDelete: 'cascade'
        });
      }
    }
  });
  return Module;
};