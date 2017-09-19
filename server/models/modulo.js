'use strict';
module.exports = function(sequelize, DataTypes) {
  var Modulo = sequelize.define('Modulo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    nome: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Modulo.belongsTo(models.GrupoDeModulo);
        Modulo.belongsToMany(models.Programa, {through: 'ModuloPrograma'});
      }
    }
  });
  return Modulo;
};