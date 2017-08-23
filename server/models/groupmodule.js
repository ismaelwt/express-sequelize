'use strict';
module.exports = function(sequelize, DataTypes) {
  var GroupModule = sequelize.define('GroupModule', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        GroupModule.hasMany(models.Module, {
          onDelete: 'cascade'
        });
      }
    }
  });
  return GroupModule;
};