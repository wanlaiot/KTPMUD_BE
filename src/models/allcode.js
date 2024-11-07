'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Allcode.hasMany(models.User, { foreignKey:'', as:''})
      // define association here
    }
  }
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEN: DataTypes.STRING,
    valueVI: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};