'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductResource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  }
  ProductResource.init(
    {
      productId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      extension: DataTypes.STRING,
      path: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ProductResource'
    }
  );
  return ProductResource;
};
