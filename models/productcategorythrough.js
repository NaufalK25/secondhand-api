'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCategoryThrough extends Model {}
    ProductCategoryThrough.init(
        { productId: DataTypes.INTEGER, productCategoryId: DataTypes.INTEGER },
        { sequelize, modelName: 'ProductCategoryThrough' }
    );
    return ProductCategoryThrough;
};
