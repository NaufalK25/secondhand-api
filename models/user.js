'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.belongsTo(models.RoleUser, { foreignKey: 'roleId' });
            this.hasMany(models.Notification, { foreignKey: 'userId' });
            this.hasMany(models.Product, { foreignKey: 'sellerId' });
            this.hasOne(models.Profile, { foreignKey: 'userId' });
            this.hasMany(models.Wishlist, { foreignKey: 'userId' });
            this.hasMany(models.ProductOffer, { foreignKey: 'buyerId' });
            this.hasMany(models.Transaction, { foreignKey: 'buyerId' });
            this.hasMany(models.TransactionHistory, { foreignKey: 'buyerId' });
        }
    }
    User.init(
        {
            roleId: DataTypes.INTEGER,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            googleId: DataTypes.STRING
        },
        { sequelize, modelName: 'User' }
    );
    return User;
};
