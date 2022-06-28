'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TransactionHistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Products', key: 'id' }
            },
            transactionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Transactions', key: 'id' }
            },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('TransactionHistories');
    }
};
