'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'sellerId' });
            this.belongsToMany(models.ProductCategory, {
                foreignKey: 'productId',
                through: 'ProductCategoryThrough'
            });
            this.hasMany(models.TransactionHistory, {
                foreignKey: 'transactionId'
            });
            this.hasMany(models.Notification, { foreignKey: 'productId' });
            this.hasMany(models.ProductResource, { foreignKey: 'productId' });
            this.hasMany(models.Wishlist, { foreignKey: 'productId' });
            this.hasMany(models.ProductOffer, { foreignKey: 'productId' });
            this.hasMany(models.Transaction, { foreignKey: 'productId' });

        }
    }
    Product.init(
        {
            sellerId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            publishDate: DataTypes.DATE,
            sold: DataTypes.INTEGER,
            description: DataTypes.STRING,
            status: DataTypes.BOOLEAN
        },
        { sequelize, modelName: 'Product' }
    );
    return Product;
};
