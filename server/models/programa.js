'use strict';
module.exports = function(sequelize, DataTypes) {
  var Programa = sequelize.define('Programa', {
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
        Programa.belongsToMany(models.Module, {through: 'ModuloPrograma'});
      }
    }
  });
  return Programa;
};