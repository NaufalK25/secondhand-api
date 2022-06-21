'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'sellerId' });
            this.belongsTo(models.ProductCategory, {
                foreignKey: 'categoryId'
            });
            this.hasMany(models.notification, { foreignKey: 'product_Id' });
            this.hasMany(models.ProductResource, { foreignKey: 'productId' });
            this.hasMany(models.Wishlist, { foreignKey: 'productId' });
            this.hasMany(models.ProductOffer, { foreignKey: 'productId' });
            this.hasMany(models.Transaction, { foreignKey: 'productId' });
           
        }
    }
    Product.init(
        {
            sellerId: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            publishDate: DataTypes.DATE,
            stock: DataTypes.INTEGER,
            sold: DataTypes.INTEGER,
            description: DataTypes.STRING,
            status: DataTypes.STRING
        },
        { sequelize, modelName: 'Product' }
    );
    return Product;
};
