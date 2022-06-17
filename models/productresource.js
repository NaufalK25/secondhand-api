'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductResource extends Model {
        static associate(models) {
            this.belongsTo(models.Product, { foreignKey: 'productId' });
        }
    }
    ProductResource.init(
        {
            productId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            extension: DataTypes.STRING,
            path: DataTypes.STRING
        },
        { sequelize, modelName: 'ProductResource' }
    );
    return ProductResource;
};
