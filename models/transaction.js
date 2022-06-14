'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TransactionHistory, { foreignKey: 'transactionId' });
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
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Transaction'
    }
  );
  return Transaction;
};
