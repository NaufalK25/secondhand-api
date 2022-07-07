'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductOffers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: { type: Sequelize.INTEGER, allowNull: false },
            buyerId: { type: Sequelize.INTEGER, allowNull: false },
            priceOffer: { type: Sequelize.INTEGER, allowNull: false },
            status: { type: Sequelize.BOOLEAN, defaultValue: null }, // null = pending, true = accept, false = reject
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductOffers');
    }
};
