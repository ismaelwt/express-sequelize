'use strict';
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    email: {
      field: 'email',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Email is not valid"
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 6,
          msg: "Password must be more than 6 characters"
        }
      }
    },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
      freezeTableName: true,
      paranoid: true,
      classMethods: {
        associate: function (models) {
          Usuario.belongsTo(models.Empresa, { foreignKey: 'EmpresaId' })
        }
      },
      instanceMethods: {
        generateHash(value) {
          return bcrypt.hashSync(value, 10);
        },
        compareHash(value) {
          return bcrypt.compareSync(value, this.password)
        }
      }
    });

  Usuario.hook('beforeCreate', (user, options) => {
    user.password = user.generateHash(user.password);
  });

  return Usuario;
};