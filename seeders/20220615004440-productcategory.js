'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'ProductCategories',
            [
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
                },
                {
                    category: 'Kecantikan',
                    description: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Fashion pria',
                    description: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    category: 'Fashion wanita',
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
