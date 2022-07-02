'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCategory extends Model {
        static associate(models) {
            this.belongsToMany(models.Product, {
                foreignKey: 'productCategoryId',
                through: 'ProductCategoryThrough'
            });
        }
    }
    ProductCategory.init(
        { category: DataTypes.STRING },
        { sequelize, modelName: 'ProductCategory' }
    );
    return ProductCategory;
};
