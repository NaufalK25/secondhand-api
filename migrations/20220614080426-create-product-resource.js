'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductResources', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: { type: Sequelize.INTEGER, allowNull: false },
            filename: { type: Sequelize.STRING, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductResources');
    }
};
