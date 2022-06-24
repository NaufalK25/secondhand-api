const { notFound } = require('../controllers/error');
const { ProductCategory } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const categories = await ProductCategory.findAll();

        if (categories.length === 0)
            return notFound(req, res, 'Kategori tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Kategori ditemukan',
            data: categories
        });
    }
};
