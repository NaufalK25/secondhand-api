'use strict';
const bcryptjs = require('bcryptjs');
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcryptjs.hash('Secondhand06', 10);
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    roleId: 2,
                    email: 'usersecret@gmail.com',
                    password: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    roleId: 2,
                    email: 'userbdo@gmail.com',
                    password: hashedPassword,
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
                    name: 'john dae',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 2,
                    name: 'john dae2',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
