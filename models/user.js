'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RoleUser, { foreignKey: 'role_id', as: 'role' });
      this.hasOne(models.Profile, { foreignKey: 'user_id', as: 'user' });
      this.hasMany(models.Wishlist, { foreignKey: 'user_id', as: 'user' });
      this.hasMany(models.ProductOffer, { foreignKey: 'buyer_id', as: 'buyer' });
      this.hasMany(models.Transaction, { foreignKey: 'buyer_id', as: 'buyer' });
      this.hasMany(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  User.init({
    role_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    google_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};