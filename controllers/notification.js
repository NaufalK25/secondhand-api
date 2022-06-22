const { notFound } = require('../controllers/error');
const {
    Notification,
    Product,
    ProductOffer,
    ProductResources
} = require('../models');

module.exports = {
    findByUser: async (req, res) => {
        const notification = await Notification.findAll({
            where: { userId: req.user.id },
            include: [
                { model: Product, include: [{ model: ProductResources }] },
                { model: ProductOffer }
            ]
        });

        if (notification.length === 0)
            return notFound(req, res, 'Notification not found');

        res.status(200).json({
            success: true,
            message: 'Notification found',
            data: notification
        });
    }
};
