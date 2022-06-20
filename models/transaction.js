'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            this.hasMany(models.TransactionHistory, {
                foreignKey: 'transactionId'
            });
            this.belongsTo(models.Product, { foreignKey: 'productId' });
            this.belongsTo(models.User, { foreignKey: 'buyerId' });
        }
    }
    Transaction.init(
        {
            productId: DataTypes.INTEGER,
            buyerId: DataTypes.INTEGER,
            transactionDate: DataTypes.DATE,
            fixPrice: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN
        },
        { sequelize, modelName: 'Transaction' }
    );
    return Transaction;
};
