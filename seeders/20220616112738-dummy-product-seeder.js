'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Products',
            [
                {
                    sellerId: 1,
                    categoryId: 3,
                    name: 'Scarlett',
                    price: 1,
                    publishDate: new Date(),
                    stock: 10,
                    sold: 0,
                    description: 'Bodylotion',
                    status: 'ready stock',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    sellerId: 1,
                    categoryId: 5,
                    name: 'Gucci',
                    price: 1,
                    publishDate: new Date(),
                    stock: 5,
                    sold: 0,
                    description: 'Barang branded',
                    status: 'ready stock',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Products', null, {});
    }
};
