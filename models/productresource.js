'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductResource extends Model {
        static associate(models) {
            this.belongsTo(models.Product, { foreignKey: 'productId' });
        }
    }
    ProductResource.init(
        { productId: DataTypes.INTEGER, filename: DataTypes.STRING },
        { sequelize, modelName: 'ProductResource' }
    );
    return ProductResource;
};
