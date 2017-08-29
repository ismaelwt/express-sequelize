'use strict';
module.exports = function(sequelize, DataTypes) {
  var usuario = sequelize.define('Usuario', {
    name: DataTypes.STRING,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    email: {
      field:        'email',
      type:         DataTypes.STRING,
      allowNull:    false,
      unique:       true,
      validate: {
        isEmail: {
          args:     true,
          msg:      "Email is not valid"
        }
      },
    },
    password: {
      type:         DataTypes.STRING,
      allowNull:    false,
      validate: {
        min: {
          args:     6,
          msg:      "Password must be more than 6 characters"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      validPassword: function(value) {
        return value === this.password;
      }
    }
  });
  return usuario;
};