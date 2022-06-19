const { notFound } = require('../controllers/error');
const { City } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const city = await City.findAll();

        if (city.length === 0) return notFound(req, res, 'City not found');

        res.status(200).json({
            success: true,
            message: 'City found',
            data: city
        });
    }
};
