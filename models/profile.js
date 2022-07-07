'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'userId' });
            this.belongsTo(models.City, { foreignKey: 'cityId' });
        }
    }
    Profile.init(
        {
            userId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            profilePicture: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            cityId: DataTypes.INTEGER,
            address: DataTypes.TEXT
        },
        { sequelize, modelName: 'Profile' }
    );
    return Profile;
};
