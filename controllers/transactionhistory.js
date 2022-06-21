const { validationResult } = require('express-validator');
const { badRequest, notFound } = require('../controllers/error');
const { Product, Transaction, TransactionHistory } = require('../models');

module.exports = {
    findByUser: async (req, res) => {
        let transaction;
        if (req.user.roleId == 2) {
            //kalo dia seller dia bakal nampilin transaksi barang seller
            transaction = await TransactionHistory.findAll(
                { include: [{ model: Transaction }] },
                {
                    include: {
                        model: Product,
                        where: { sellerId: req.user.id }
                    }
                }
            );
        } else {
            //kalo dia buyer dia bakal nampilin transaksi yang dia ajukan
            transaction = await TransactionHistory.findAll({
                include: { model: Transaction, where: { buyerId: req.user.id } }
            });
        }

        if (transaction.length === 0)
            return notFound(req, res, 'Transction history not found');

        res.status(200).json({
            success: true,
            message: 'Transction history found',
            data: transaction
        });
    },
    findById: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        let transaction;
        if (req.user.roleId == 2) {
            //kalo dia seller dia bakal nampilin transaksi barang seller
            transaction = await TransactionHistory.findAll(
                { where: { id: req.params.id } },
                { include: [{ model: Transaction }] },
                {
                    include: {
                        model: Product,
                        where: { sellerId: req.user.id }
                    }
                }
            );
        } else {
            //kalo dia buyer dia bakal nampilin transaksi yang dia ajukan
            transaction = await TransactionHistory.findAll(
                { where: { id: req.params.id } },
                {
                    include: {
                        model: Transaction,
                        where: { buyerId: req.user.id }
                    }
                }
            );
        }

        if (transaction.length === 0)
            return notFound(req, res, 'Transction history not found');

        res.status(200).json({
            success: true,
            message: 'Transction history found',
            data: transaction
        });
    }
};
