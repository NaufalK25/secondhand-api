const { validationResult } = require('express-validator');
const { badRequest, forbidden, notFound } = require('../controllers/error');
const {
    City,
    Product,
    ProductOffer,
    ProductResource,
    Profile,
    Transaction,
    TransactionHistory,
    User,
    Wishlist
} = require('../models');

module.exports = {
    findByUser: async (req, res) => {
        let transactions;
        if (req.user.roleId === 2) {
            //kalo dia seller dia bakal nampilin transaksi barang seller
            transactions = await Transaction.findAll({
                include: [
                    {
                        model: User,
                        include: [{ model: Profile, include: [{ model: City }] }]
                    },
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
            });
        } else {
            //kalo dia buyer dia bakal nampilin transaksi yang dia ajukan
            transactions = await Transaction.findAll({
                where: { buyerId: req.user.id },
                include: [
                    {
                        model: User,
                        include: [{ model: Profile, include: [{ model: City }] }]
                    },
                    {
                        model: ProductOffer,
                        include: [
                            {
                                model: Product,
                                include: [{ model: ProductResource }]
                            }
                        ]
                    }
                ]
            });
        }

        if (transactions.length === 0)
            return notFound(req, res, 'Transaksi tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Transaksi ditemukan',
            data: transactions
        });
    },
    findById: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const transaction = await Transaction.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    include: [{ model: Profile, include: [{ model: City }] }]
                },
                {
                    model: ProductOffer,
                    include: [
                        {
                            model: Product,
                            include: [{ model: ProductResource }]
                        }
                    ]
                }
            ]
        });

        if (!transaction)
            return notFound(req, res, 'Transaksi tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Transaksi ditemukan',
            data: transaction
        });
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const transaction = await Transaction.findByPk(req.params.id, {
            include: [{ model: ProductOffer, include: [{ model: Product }] }]
        });
        const updatedData = {};
        if (!transaction)
            return notFound(req, res, 'Transaksi tidak ditemukan');
        if (transaction.ProductOffer.Product.sellerId !== req.user.id)
            return forbidden(
                req,
                res,
                'Anda tidak diperbolehkan untuk memperbarui transaksi ini'
            );

        updatedData.status = transaction.status;
        if (req.body.status) updatedData.status = req.body.status;

        await Transaction.update(updatedData, {
            where: { id: req.params.id }
        });

        if (updatedData.status === 'true' || updatedData.status === true) {
            // transaction completed
            await Product.update(
                { status: false }, // product sold
                { where: { id: transaction.ProductOffer.Product.id } }
            );

            // make product unavailable for other buyers
            await Wishlist.update(
                { status: false }, // wishlist product unavailable
                { where: { productId: transaction.ProductOffer.Product.id } }
            );

            // delete wishlist for buyer who bought the product
            await Wishlist.destroy({
                where: {
                    userId: transaction.buyerId,
                    productId: transaction.ProductOffer.Product.id
                }
            });
        }

        await TransactionHistory.create({
            buyerId: transaction.buyerId,
            transactionId: transaction.id
        });

        res.status(200).json({
            success: true,
            message: 'Transaksi berhasil diperbarui',
            data: { id: req.user.id, ...updatedData }
        });
    }
};
