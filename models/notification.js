'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'userId' });
            this.belongsTo(models.Product, { foreignKey: 'productId' });
            this.belongsTo(models.ProductOffer, {
                foreignKey: 'productOfferId'
            });
        }
    }
    Notification.init(
        {
            userId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            productOfferId: DataTypes.INTEGER,
            type: DataTypes.STRING,
            description: DataTypes.STRING
        },
        { sequelize, modelName: 'Notification' }
    );
    return Notification;
};
