'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'sellerId' });
      this.belongsTo(models.ProductCategory, { foreignKey: 'categoryId' });
      this.hasMany(models.ProductResource, { foreignKey: 'productId' });
      this.hasMany(models.Wishlist, { foreignKey: 'productId' });
      this.hasMany(models.ProductOffer, { foreignKey: 'productId' });
      this.hasMany(models.Transaction, { foreignKey: 'productId' });
    }
  }
  Product.init(
    {
      sellerId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      price: DataTypes.INTEGER,
      publishDate: DataTypes.DATE,
      stock: DataTypes.INTEGER,
      description: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Product'
    }
  );
  return Product;
};
