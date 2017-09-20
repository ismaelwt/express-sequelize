'use strict';
module.exports = function(sequelize, DataTypes) {
  var Empresa = sequelize.define('Empresa', {
    nome: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    endereco: DataTypes.STRING,
    cep: DataTypes.STRING,
    bairro:DataTypes.STRING,
    numero: DataTypes.STRING,
    ddd: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    complemento: DataTypes.STRING,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    _isRoot: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    freezeTableName: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Empresa.hasMany(models.GrupoDeModulo);
        Empresa.hasMany(models.Usuario);
      }
    }
  });
  return Empresa;
};