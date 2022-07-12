const { validationResult } = require('express-validator');
const { badRequest, notFound } = require('../controllers/error');
const {
    Notification,
    Product,
    ProductOffer,
    ProductResource
} = require('../models');

module.exports = {
    findByUser: async (req, res) => {
        const notification = await Notification.findAll({
            where: { userId: req.user.id },
            include: [
                { model: Product, include: [{ model: ProductResource }] },
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
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const notification = await Notification.findByPk(req.params.id);
        if (!notification)
            return notFound(req, res, 'Notifikasi tidak ditemukan');

        await Notification.update(
            { status: true },
            { where: { id: req.params.id } }
        );

        res.status(200).json({
            success: true,
            message: 'Notifikasi berhasil diperbarui',
            data: null
        });
    }
};
