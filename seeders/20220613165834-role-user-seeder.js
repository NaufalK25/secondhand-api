'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RoleUsers', [
      {
          role: 'buyer',
          description: 'Buyer as default',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          role: 'seller',
          description: 'Seller',
          createdAt: new Date(),
          updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('RoleUsers', null, {});
  }
};
