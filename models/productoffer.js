'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      this.belongsTo(models.User, { foreignKey: 'buyer_id', as: 'buyer' });
    }
  }
  ProductOffer.init({
    product_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    price_offer: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductOffer',
  });
  return ProductOffer;
};