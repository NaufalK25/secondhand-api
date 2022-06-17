const { validationResult } = require('express-validator');
const { User, Product, ProductOffer } = require('../models');
const { badRequest, forbidden, notFound } = require('./error');

module.exports = {
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const product = await Product.findByPk(req.body.productId);
        if (!product) return notFound(req, res, 'Product not found');

        const newProductOffer = await ProductOffer.create({
            productId: req.body.productId,
            buyerId: req.user.id,
            priceOffer: req.body.priceOffer,
            status: 'Pending'
        });

        res.status(201).json({
            success: true,
            message: 'Product Offer created',
            data: newProductOffer
        });
    },

    findByUser: async (req, res) => {
        const userProductOffer = await ProductOffer.findAll({
            buyerId: req.user.id
        });

        res.status(200).json({
            success: true,
            message: 'Product Offer found',
            data: userProductOffer
        });
    }
};
