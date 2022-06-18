const { validationResult } = require('express-validator');
const { Product, ProductOffer, Transaction, User } = require('../models');
const { badRequest, forbidden, notFound } = require('./error');

module.exports = {
    findByUser: async (req, res) => {
        let userProductOffer;
        if (req.user.roleId == 2) {
            //kalo dia seller dia bakal nampilin penawaran yang diajuin buyer
            userProductOffer = await ProductOffer.findAll({
                include: [
                    {
                        model: Product,
                        attributes: [],
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
            return notFound(req, res, 'Offer not found');

        res.status(200).json({
            success: true,
            message: 'Offer found',
            data: userProductOffer
        });
    },
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const product = await Product.findByPk(req.body.productId);
        if (!product) return notFound(req, res, 'Product not found');

        const newProductOffer = await ProductOffer.create({
            productId: req.body.productId,
            buyerId: req.user.id,
            priceOffer: req.body.priceOffer
        });

        res.status(201).json({
            success: true,
            message: 'Offer created',
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
        if (!userProductOffer) return notFound(req, res, 'Offer not found');

        updatedData.status = userProductOffer.status;
        if (req.body.status)
            updatedData.status = req.body.status;

        await ProductOffer.update(updatedData, {
            where: { id: req.params.id }
        });
        if (updatedData.status == 'Accepted') {
            // TODO make transaction kalo diterima tawarannya sama seller dia langsung ke proses transaksi
            await Transaction.create({
                productId: userProductOffer.productId,
                buyerId: userProductOffer.buyerId,
                transactionDate: new Date(),
                fixPrice: userProductOffer.priceOffer,
                status: 'Pending'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Offer updated',
            data: {
                id: req.user.id,
                ...updatedData
            }
        });
    }
};
