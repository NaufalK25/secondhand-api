'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'ProductCategories',
            [
                {
                    category: 'Hobi',
                    description: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Kendaraan',
                    description: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Baju',
                    description: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Elektronik',
                    description: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Kesehatan',
                    description: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductCategories', null, {});
    }
};
