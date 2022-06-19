'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TransactionHistory extends Model {
        static associate(models) {
            this.belongsTo(models.Product, { foreignKey: 'productId' });
            this.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }
    TransactionHistory.init(
        { userId: DataTypes.INTEGER, transactionId: DataTypes.INTEGER },
        { sequelize, modelName: 'TransactionHistory' }
    );
    return TransactionHistory;
};
