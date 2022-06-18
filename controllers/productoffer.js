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
    },
    
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const userProductOffer = await ProductOffer.findOne({
            buyerId: req.user.id
        });
        const updatedData = {};
        if (!profile) return notFound(req, res);

        if (req.body.name) updatedData.name = req.body.name || profile.name;
        if (req.body.userId)
            updatedData.userId = req.body.userId || profile.userId;
        if (req.body.name) updatedData.name = req.body.name || profile.name;
        if (req.body.phoneNumber)
            updatedData.phoneNumber =
                req.body.phoneNumber || profile.phoneNumber;
        if (req.body.cityId)
            updatedData.cityId = req.body.cityId || profile.cityId;
        if (req.body.address)
            updatedData.address = req.body.address || profile.address;

        await Profile.update(updatedData, { where: { id: req.user.id } });
        await User.update({ roleId: 2 }, { where: { id: req.user.id } }); // change to seller

        res.status(200).json({
            success: true,
            message: 'Update profile successful',
            data: {
                id: req.user.id,
                ...updatedData
            }
        });
    }
};
