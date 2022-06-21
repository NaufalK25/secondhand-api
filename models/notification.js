'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'product_Id' });
      this.belongsTo(models.ProductOffer, { foreignKey: 'productOffer_Id' });
    }
  }
  notification.init({
    product_Id: DataTypes.INTEGER,
    productOffer_Id: DataTypes.INTEGER,
    jenis_notif: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};