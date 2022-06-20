'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductCategoryThroughs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Products', key: 'id' },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            productCategoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'ProductCategories', key: 'id' },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductCategoryThroughs');
    }
};
