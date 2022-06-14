'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' , as: 'user'});
      this.belongsTo(models.Cities, { foreignKey: 'cities_id' , as: 'cities'});
    }
  }
  Profile.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    profile_pict: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    cities_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};