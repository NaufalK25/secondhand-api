'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sellerId: { type: Sequelize.INTEGER, allowNull: false },
            name: { type: Sequelize.STRING, allowNull: false },
            price: { type: Sequelize.INTEGER, allowNull: false },
            publishDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            description: { type: Sequelize.TEXT, allowNull: false },
            status: { type: Sequelize.BOOLEAN, defaultValue: true }, // true = available, false = unavailable / sold out
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    }
};
