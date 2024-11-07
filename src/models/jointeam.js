'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JoinTeam extends Model {
    /** 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // JoinTeam.belongsTo(models.User, { foreignKey: 'idUser' })
      // JoinTeam.belongsTo(models.Team, { foreignKey: 'idTeam' })
    }
  }
  JoinTeam.init({
    idUser: DataTypes.INTEGER,
    idTeam: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'JoinTeam',
  });
  return JoinTeam;
};