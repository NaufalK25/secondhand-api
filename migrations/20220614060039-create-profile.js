'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Profiles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            name: { type: Sequelize.STRING, allowNull: false },
            profilePicture: {
                type: Sequelize.STRING,
                defaultValue: 'https://res.cloudinary.com/dko04cygp/image/upload/v1656654290/profiles/default.png'
            },
            phoneNumber: { type: Sequelize.STRING, unique: true },
            cityId: {
                type: Sequelize.INTEGER
            },
            address: { type: Sequelize.TEXT },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Profiles');
    }
};
