'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCategory extends Model {
        static associate(models) {
            this.hasMany(models.Product, { foreignKey: 'categoryId' });
        }
    }
    ProductCategory.init(
        { category: DataTypes.STRING, description: DataTypes.STRING },
        { sequelize, modelName: 'ProductCategory' }
    );
    return ProductCategory;
};
