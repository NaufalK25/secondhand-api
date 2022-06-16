const { validationResult } = require('express-validator');
const { Wishlist, User, Product } = require('../models');
const { badRequest, notFound } = require('./error');

module.exports = {
    findByUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const wishlist = await Wishlist.findAll(
            { where: { userId: req.user.id } },
            { include: [{ model: User }, { model: Product }] }
        );

        res.status(200).json({
            success: true,
            message: 'Wishlist found',
            data: wishlist
        });
    },
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const user = await User.findByPk(req.user.id);
        if (!user) return notFound(req, res, 'User not found');

        const product = await Product.findByPk(req.body.productId);
        if (!product) return notFound(req, res, 'Product not found');

        const newWishlist = await Wishlist.create({
            userId: req.user.id,
            productId: req.body.productId
        });

        res.status(201).json({
            success: true,
            message: 'Wishlist created',
            data: newWishlist
        });
    }
};
