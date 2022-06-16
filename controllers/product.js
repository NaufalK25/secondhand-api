const { Product } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const products = await Product.findAll({
            where: { sellerId: req.user.id }
        });

        res.status(200).json({
            success: true,
            message: 'Product successful',
            data: products
        });
    }
};
