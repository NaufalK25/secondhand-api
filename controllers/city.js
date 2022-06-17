const { City } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const city = await City.findAll();

        res.status(200).json({
            success: true,
            message: 'City successful',
            data: city
        });
    }
};
