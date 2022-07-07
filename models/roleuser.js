'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RoleUser extends Model {
        static associate(models) {
            this.hasMany(models.User, { foreignKey: 'roleId' });
        }
    }
    RoleUser.init(
        { role: DataTypes.STRING, description: DataTypes.TEXT },
        { sequelize, modelName: 'RoleUser' }
    );
    return RoleUser;
};
