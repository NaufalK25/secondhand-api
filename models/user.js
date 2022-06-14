'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RoleUser, { foreignKey: 'roleId' });
      this.hasMany(models.Product, { foreignKey: 'sellerId' });
      this.hasOne(models.Profile, { foreignKey: 'userId' });
      this.hasMany(models.Wishlist, { foreignKey: 'userId' });
      this.hasMany(models.ProductOffer, { foreignKey: 'buyerId' });
      this.hasMany(models.Transaction, { foreignKey: 'buyerId' });
    }
  }
  User.init(
    {
      roleId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      googleId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
