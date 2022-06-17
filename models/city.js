'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        static associate(models) {
            this.hasMany(models.Profile, { foreignKey: 'cityId' });
        }
    }
    City.init({ city: DataTypes.STRING }, { sequelize, modelName: 'City' });
    return City;
};
