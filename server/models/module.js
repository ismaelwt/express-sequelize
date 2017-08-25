'use strict';
module.exports = function(sequelize, DataTypes) {
  var Module = sequelize.define('Module', {
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
        Module.belongsTo(models.GroupModule,  {
          onDelete: 'cascade'
        });
        Module.belongsToMany(models.Programa, {through: 'ModuloPrograma'});
      }
    }
  });
  return Module;
};