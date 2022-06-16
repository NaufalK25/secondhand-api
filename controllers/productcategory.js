const { ProductCategory } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const categories = await ProductCategory.findAll();

        res.status(200).json({
            success: true,
            message: 'Category successful',
            data: categories
        });
    }
};
