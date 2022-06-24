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
            return notFound(req, res, 'Notifikasi tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Notifikasi ditemukan',
            data: notification
        });
    }
};
