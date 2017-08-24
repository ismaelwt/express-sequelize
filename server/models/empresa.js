'use strict';
module.exports = function(sequelize, DataTypes) {
  var Empresa = sequelize.define('Empresa', {
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
        Empresa.hasMany(models.GroupModule, {
          onDelete: 'cascade'
        });
      }
    }
  });
  return Empresa;
};