'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductOffer extends Model {
        static associate(models) {
            this.belongsTo(models.Product, { foreignKey: 'productId' });
            this.belongsTo(models.User, { foreignKey: 'buyerId' });
        }
    }
    ProductOffer.init(
        {
            productId: DataTypes.INTEGER,
            buyerId: DataTypes.INTEGER,
            priceOffer: DataTypes.INTEGER,
            status: DataTypes.STRING
        },
        { sequelize, modelName: 'ProductOffer' }
    );
    return ProductOffer;
};
