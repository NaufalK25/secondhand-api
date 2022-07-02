'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'ProductCategories',
            [
                {
                    category: 'Hobi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Kendaraan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Baju',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Elektronik',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Kesehatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductCategories', null, {
            truncate: true,
            restartIdentity: true
        });
    }
};
