'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCategoryThrough extends Model {
        static associate(models) {
            this.belongsTo(models.Product, {
                foreignKey: 'productId',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.ProductCategory, {
                foreignKey: 'productCategoryId',
                onDelete: 'CASCADE'
            });
        }
    }
    ProductCategoryThrough.init(
        { productId: DataTypes.INTEGER, productCategoryId: DataTypes.INTEGER },
        { sequelize, modelName: 'ProductCategoryThrough' }
    );
    return ProductCategoryThrough;
};
