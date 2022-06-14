'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      address: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Profile'
    }
  );
  return Profile;
};
