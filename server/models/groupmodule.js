'use strict';
module.exports = function(sequelize, DataTypes) {
  var GroupModule = sequelize.define('GroupModule', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
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