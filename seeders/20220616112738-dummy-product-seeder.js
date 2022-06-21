'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Products',
            [
                {
                    sellerId: 1,
                    name: 'Scarlett',
                    price: 1,
                    publishDate: new Date(),
                    stock: 10,
                    sold: 0,
                    description: 'Bodylotion',
                    status: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    sellerId: 1,
                    name: 'Gucci',
                    price: 1,
                    publishDate: new Date(),
                    stock: 5,
                    sold: 0,
                    description: 'Barang branded',
                    status: true,
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
