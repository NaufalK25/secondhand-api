const { notFound } = require('../controllers/error');
const { Product } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const products = await Product.findAll({
            where: { sellerId: req.user.id }
        });

        if (products.length === 0)
            return notFound(req, res, 'Product not found');

        res.status(200).json({
            success: true,
            message: 'Product found',
            data: products
        });
    }
};
