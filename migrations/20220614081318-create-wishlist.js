'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Wishlists', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: { type: Sequelize.INTEGER, allowNull: false },
            productId: { type: Sequelize.INTEGER, allowNull: false },
            status: { type: Sequelize.BOOLEAN, defaultValue: true }, // true = available, false = unavailable / sold out
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Wishlists');
    }
};
