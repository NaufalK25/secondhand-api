'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'userId' });
            this.belongsTo(models.Product, { foreignKey: 'productId' });
        }
    }
    Wishlist.init(
        { userId: DataTypes.INTEGER, productId: DataTypes.INTEGER },
        { sequelize, modelName: 'Wishlist' }
    );
    return Wishlist;
};
