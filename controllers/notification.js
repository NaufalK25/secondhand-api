const { notFound } = require('../controllers/error');
const { notification } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const Notification = await notification.findAll();

        if (Notification.length === 0) return notFound(req, res, 'Notification not found');

        res.status(200).json({
            success: true,
            message: 'Notification found',
            data: Notification
        });
    }
};
