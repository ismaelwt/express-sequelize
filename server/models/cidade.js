'use strict';
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var Cidade = sequelize.define('Cidade', {
    nome: DataTypes.STRING,
    uf: DataTypes.STRING,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  }, {
      freezeTableName: true,
      paranoid: true,
      classMethods: {
        associate: function (models) {
          Cidade.hasOne(models.Empresa);
        }
      },
      instanceMethods: {
      }
    });
  return Cidade;
};