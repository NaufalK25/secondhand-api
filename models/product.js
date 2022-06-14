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
      this.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
      this.belongsTo(models.ProductCategory, {
        foreignKey: 'categoryId',
        as: 'category'
      });
      this.hasMany(models.ProductResource, { foreignKey: 'productId' });
      this.hasMany(models.Wishlist, {
        foreignKey: 'productId',
        as: 'product'
      });
      this.hasMany(models.ProductOffer, {
        foreignKey: 'productId',
        as: 'product'
      });
      this.hasMany(models.Transaction, {
        foreignKey: 'productId',
        as: 'product'
      });
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
