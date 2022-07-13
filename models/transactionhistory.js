'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TransactionHistory extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'buyerId' });
            this.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
        }
    }
    TransactionHistory.init(
        { buyerId: DataTypes.INTEGER, transactionId: DataTypes.INTEGER },
        { sequelize, modelName: 'TransactionHistory' }
    );
    return TransactionHistory;
};
