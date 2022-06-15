'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductOffer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Product, { foreignKey: 'productId' });
            this.belongsTo(models.User, { foreignKey: 'buyerId' });
        }
    }
    ProductOffer.init(
        {
            productId: DataTypes.INTEGER,
            buyerId: DataTypes.INTEGER,
            priceOoffer: DataTypes.INTEGER,
            status: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'ProductOffer'
        }
    );
    return ProductOffer;
};
