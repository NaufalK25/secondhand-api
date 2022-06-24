'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ProductCategoryThroughs', [
          {
            productId: 1,
            productCategoryId: 5,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId: 2,
            productCategoryId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductCategoryThroughs', null, {});
    }
};
