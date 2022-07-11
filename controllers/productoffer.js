const { validationResult } = require('express-validator');
const {
    Notification,
    Product,
    ProductOffer,
    Transaction,
    TransactionHistory,
    User,
    Wishlist
} = require('../models');
const { badRequest, forbidden, notFound } = require('./error');

module.exports = {
    findByUser: async (req, res) => {
        let userProductOffer;
        if (req.user.roleId === 2) {
            //kalo dia seller dia bakal nampilin penawaran yang diajuin buyer
            userProductOffer = await ProductOffer.findAll({
                include: [
                    {
                        model: Product,
                        where: { sellerId: req.user.id }
                    }
                ]
            });
        } else {
            //kalo dia buyer dia bakal nampilin produk yang lagi dia tawar
            userProductOffer = await ProductOffer.findAll({
                where: { buyerId: req.user.id }
            });
        }

        if (userProductOffer.length === 0)
            return notFound(req, res, 'Penawaran produk tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Penawaran produk ditemukan',
            data: userProductOffer
        });
    },
    findById: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const userProductOffer = await ProductOffer.findByPk(req.params.id, {
            include: [{ model: Product }]
        });

        if (!userProductOffer)
            return notFound(req, res, 'Penawaran produk tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Penawaran produk ditemukan',
            data: userProductOffer
        });
    },
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const product = await Product.findByPk(req.body.productId);
        if (!product) return notFound(req, res, 'Produk tidak ditemukan');

        const newProductOffer = await ProductOffer.create({
            productId: req.body.productId,
            buyerId: req.user.id,
            priceOffer: req.body.priceOffer
        });

        await Wishlist.create({ userId: req.user.id, productId: product.id });

        // notify buyer if their offer has been sent
        await Notification.create({
            userId: req.user.id,
            productId: product.id,
            productOfferId: newProductOffer.id,
            type: 'Penawaran produk'
        });

        // notify seller if their product is being offered
        await Notification.create({
            userId: product.sellerId,
            productId: product.id,
            productOfferId: newProductOffer.id,
            type: 'Penawaran produk'
        });

        res.status(201).json({
            success: true,
            message: 'Penawaran produk berhasil dibuat',
            data: newProductOffer
        });
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const userProductOffer = await ProductOffer.findByPk(req.params.id, {
            include: [{ model: Product, include: [{ model: User }] }]
        });
        const updatedData = {};
        if (!userProductOffer)
            return notFound(req, res, 'Penawaran produk tidak ditemukan');
        if (userProductOffer.Product.sellerId !== req.user.id)
            return forbidden(
                req,
                res,
                'Anda tidak diperbolehkan untuk memperbarui penawaran produk ini'
            );

        updatedData.status = userProductOffer.status;
        if (req.body.status) updatedData.status = req.body.status;

        await ProductOffer.update(updatedData, {
            where: { id: req.params.id }
        });

        if (updatedData.status === 'true' || updatedData.status === true) {
            // product offer accepted
            const transaction = await Transaction.create({
                productId: userProductOffer.productId,
                buyerId: userProductOffer.buyerId,
                fixPrice: userProductOffer.priceOffer
            });

            await TransactionHistory.create({
                productId: userProductOffer.productId,
                transactionId: transaction.id
            });

            // notify buyer if product offer accepted by seller
            await Notification.create({
                userId: userProductOffer.buyerId,
                productId: userProductOffer.productId,
                productOfferId: userProductOffer.id,
                type: 'Penawaran produk',
                description: 'Kamu akan segera dihubungi penjual via whatsapp'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Penawaran produk berhasil diperbarui',
            data: {
                id: req.user.id,
                ...updatedData
            }
        });
    }
};
