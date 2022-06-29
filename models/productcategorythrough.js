'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCategoryThrough extends Model {
        static associate(models) {
            this.belongsTo(models.Product, { foreignKey: 'productId' });
            this.belongsTo(models.ProductCategory, {
                foreignKey: 'productCategoryId'
            });
        }
    }
    ProductCategoryThrough.init(
        { productId: DataTypes.INTEGER, productCategoryId: DataTypes.INTEGER },
        { sequelize, modelName: 'ProductCategoryThrough' }
    );
    return ProductCategoryThrough;
};
