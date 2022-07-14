const { validationResult } = require('express-validator');
const { badRequest, notFound } = require('../controllers/error');
const {
    City,
    Product,
    ProductOffer,
    ProductResource,
    Profile,
    Transaction,
    TransactionHistory,
    User
} = require('../models');

module.exports = {
    findByUser: async (req, res) => {
        let transaction;
        if (req.user.roleId === 2) {
            //kalo dia seller dia bakal nampilin transaksi barang seller
            transaction = await TransactionHistory.findAll({
                include: [
                    {
                        model: Transaction,
                        include: [
                            {
                                model: ProductOffer,
                                include: [
                                    {
                                        model: Product,
                                        where: { sellerId: req.user.id },
                                        include: [{ model: ProductResource }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: User,
                        include: [
                            { model: Profile, include: [{ model: City }] }
                        ]
                    }
                ]
            });
        } else {
            //kalo dia buyer dia bakal nampilin transaksi yang dia ajukan
            transaction = await TransactionHistory.findAll({
                include: [
                    {
                        model: Transaction,
                        where: { buyerId: req.user.id },
                        include: [
                            {
                                model: ProductOffer,
                                include: [
                                    {
                                        model: Product,
                                        where: { sellerId: req.user.id },
                                        include: [{ model: ProductResource }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: User,
                        include: [
                            { model: Profile, include: [{ model: City }] }
                        ]
                    }
                ]
            });
        }

        if (transaction.length === 0)
            return notFound(req, res, 'Riwayat transaksi tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Riwayat transaksi ditemukan',
            data: transaction
        });
    },
    findById: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        let transaction;
        if (req.user.roleId === 2) {
            //kalo dia seller dia bakal nampilin transaksi barang seller
            transaction = await TransactionHistory.findByPk(req.params.id, {
                include: [
                    {
                        model: Transaction,
                        include: [
                            {
                                model: ProductOffer,
                                include: [
                                    {
                                        model: Product,
                                        where: { sellerId: req.user.id },
                                        include: [{ model: ProductResource }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: User,
                        include: [
                            { model: Profile, include: [{ model: City }] }
                        ]
                    }
                ]
            });
        } else {
            //kalo dia buyer dia bakal nampilin transaksi yang dia ajukan
            transaction = await TransactionHistory.findByPk(req.params.id, {
                include: [
                    {
                        model: Transaction,
                        where: { buyerId: req.user.id },
                        include: [
                            {
                                model: ProductOffer,
                                include: [
                                    {
                                        model: Product,
                                        where: { sellerId: req.user.id },
                                        include: [{ model: ProductResource }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: User,
                        include: [
                            { model: Profile, include: [{ model: City }] }
                        ]
                    }
                ]
            });
        }

        if (!transaction)
            return notFound(req, res, 'Riwayat transaksi tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Riwayat transaksi ditemukan',
            data: transaction
        });
    }
};
