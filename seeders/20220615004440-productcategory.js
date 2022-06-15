'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
      'ProductCategory', 
      [
        {
          category: 'Aksesoris',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'Rumah Tangga',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'Elekronik',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'Fashion pria',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'Fashion wanita',
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
  }
};
