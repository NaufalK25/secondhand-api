const { notFound } = require('../controllers/error');
const { ProductCategory } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const categories = await ProductCategory.findAll();

        if (categories.length === 0)
            return notFound(req, res, 'Category not found');

        res.status(200).json({
            success: true,
            message: 'Category found',
            data: categories
        });
    }
};
