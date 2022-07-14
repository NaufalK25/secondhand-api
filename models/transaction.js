'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            this.hasMany(models.TransactionHistory, {
                foreignKey: 'transactionId'
            });
            this.belongsTo(models.ProductOffer, {
                foreignKey: 'productOfferId'
            });
            this.belongsTo(models.User, { foreignKey: 'buyerId' });
        }
    }
    Transaction.init(
        {
            productOfferId: DataTypes.INTEGER,
            buyerId: DataTypes.INTEGER,
            transactionDate: DataTypes.DATE,
            fixPrice: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN
        },
        { sequelize, modelName: 'Transaction' }
    );
    return Transaction;
};
