'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productOfferId: { type: Sequelize.INTEGER, allowNull: false },
            buyerId: { type: Sequelize.INTEGER, allowNull: false },
            transactionDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            fixPrice: { type: Sequelize.INTEGER, allowNull: false },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: null // null = pending, true = complete, false = cancel
            },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Transactions');
    }
};
