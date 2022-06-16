'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
          {
            roleId: 1,
            email: "usersecret@gmail.com",
            password: "passworduser06",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            roleId: 1,
            email: "userbdo@gmail.com",
            password: "passworduser06",
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'Profiles',
      [
          {
            userId: 1,
            name: "john dae",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            userId: 2,
            name: "john dae2",
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
