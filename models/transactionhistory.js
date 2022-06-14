'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  TransactionHistory.init({
    user_id: DataTypes.INTEGER,
    transaction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};