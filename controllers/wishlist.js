const fs = require('fs/promises');
const { validationResult } = require('express-validator');
const { Wishlist, User, Product } = require('../models');
const { badRequest } = require('./error');

module.exports = {
    findbyID: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const wishlist = await Wishlist.findAll(
            { where: { userId: req.query.userId } },
            {
                include: [{ model: User }, { model: Product }]
            }
        );
        if (!wishlist[0])
            return res.status(404).json({
                success: false,
                message: `Wishlist for this user is not found`,
                data: null
            });

        res.status(200).json({
            success: true,
            message: 'Wishlist found',
            data: wishlist
        });
    },
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const user = await User.findByPk(req.body.userId);
        if (!user)
            return res.status(404).json({
                success: false,
                message: `User is not found`,
                data: null
            });

        const product = await User.findByPk(req.body.productId);
        if (!product)
            return res.status(404).json({
                success: false,
                message: `Product is not found`,
                data: null
            });

        const createData = {};
        if (req.body.userId)
            createData.userId = req.body.userId || wishlist.userId;
        if (req.body.productId)
            createData.productId = req.body.productId || wishlist.productId;

        const already = await Wishlist.findOne({
            where: { userId: req.body.userId, productId: req.body.productId }
        });
        if (already)
            return res.status(400).json({
                success: false,
                message: `Product already exists for that user`,
                data: null
            });

        await Wishlist.create(createData);

        res.status(200).json({
            success: true,
            message: 'Create Wishlist successful',
            data: {
                id: req.query.id,
                ...createData
            }
        });
    }
};
