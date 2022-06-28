'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notifications', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Users', key: 'id' },
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Products', key: 'id' },
            },
            productOfferId: {
                type: Sequelize.INTEGER,
                references: { model: 'ProductOffers', key: 'id' },
            },
            type: { type: Sequelize.STRING, allowNull: false },
            description: { type: Sequelize.STRING },
            status: { type: Sequelize.BOOLEAN, defaultValue: false }, // true = read, false = unread
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notifications');
    }
};
