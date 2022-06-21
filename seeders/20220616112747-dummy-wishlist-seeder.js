'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Wishlists',
            [
                {
                    userId: 2,
                    productId: 1,
                    status:true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 2,
                    productId: 2,
                    status:true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Wishlists', null, {});
    }
};
