'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  TransactionHistory.init(
    {
      userId: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TransactionHistory'
    }
  );
  return TransactionHistory;
};
