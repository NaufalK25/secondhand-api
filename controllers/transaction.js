const { validationResult } = require('express-validator');
const { badRequest, forbidden, notFound } = require('../controllers/error');
const { Product, Transaction, User, Wishlist } = require('../models');

module.exports = {
    findByUser: async (req, res) => {
        let transaction;
        if (req.user.roleId == 2) {
            //kalo dia seller dia bakal nampilin transaksi barang seller
            transaction = await Transaction.findAll({
                include: [{ model: Product, where: { sellerId: req.user.id } }]
            });
        } else {
            //kalo dia buyer dia bakal nampilin transaksi yang dia ajukan
            transaction = await Transaction.findAll({
                where: { buyerId: req.user.id },
                include: [{ model: Product }]
            });
        }

        if (transaction.length === 0)
            return notFound(req, res, 'Transction not found');

        res.status(200).json({
            success: true,
            message: 'Transction found',
            data: transaction
        });
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const transaction = await Transaction.findByPk(req.params.id, {
            include: [{ model: Product, include: [{ model: User }] }]
        });
        const updatedData = {};
        if (!transaction) return notFound(req, res, 'Transaction not found');
        if (transaction.Product.sellerId !== req.user.id)
            return forbidden(
                req,
                res,
                'You are not allowed to update this transaction'
            );

        updatedData.status = transaction.status;
        if (req.body.status) updatedData.status = req.body.status;

        await Transaction.update(updatedData, {
            where: { id: req.params.id }
        });

        if (updatedData.status === 'true' || updatedData.status === true) {
            // TODO kalo status selesai/true maka product akan terjual(false) dan di wishlist juga akan false
            await Product.update(
                { status: false },
                { where: { id: transaction.productId } }
            );

            await Wishlist.update(
                { status: false },
                { where: { productId: transaction.productId } }
            );
        }
        res.status(200).json({
            success: true,
            message: 'Transaction updated',
            data: {
                id: req.user.id,
                ...updatedData
            }
        });
    }
};
