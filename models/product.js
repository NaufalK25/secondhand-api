'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'seller_id' , as: 'seller'});
      this.belongsTo(models.ProductCategory, { foreignKey: 'category_id' , as: 'category'});
      this.hasMany(models.ProductResource, { foreignKey: 'product_id' });
      this.hasMany(models.Wishlist, { foreignKey: 'product_id', as: 'product' });
      this.hasMany(models.ProductOffer, { foreignKey: 'product_id', as: 'product' });
      this.hasMany(models.Transaction, { foreignKey: 'product_id', as: 'product' });
    }
  }
  Product.init({
    seller_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    publish_date: DataTypes.DATE,
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};