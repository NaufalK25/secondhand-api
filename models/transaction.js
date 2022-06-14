'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TransactionHistory, { foreignKey: 'transaction_id', as: 'transaction' });
      this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      this.belongsTo(models.User, { foreignKey: 'buyer_id', as: 'buyer' });
    }
  }
  Transaction.init({
    product_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    fix_price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};