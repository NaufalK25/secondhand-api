const fs = require('fs/promises');
const { validationResult } = require('express-validator');
const { User, Product, ProductOffer } = require('../models');
const { badRequest } = require('./error');

module.exports = {
    create: async (req, res) => {
        console.log(req.user.dataValues.id)
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);
        console.log(req.user)

        const product = await Product.findByPk(req.body.productId);
        if (!product)
            return res.status(404).json({
                success: false,
                message: `Product is not found`,
                data: null
        });

        const createData = {};
        if (req.user.id)
            createData.buyerId = req.user.id;
        if (req.body.productId)
            createData.productId = req.body.productId;
        if (req.body.priceOffer)
            createData.priceOffer = req.body.priceOffer;
        createData.status = "Pending";

        await ProductOffer.create(createData);

        res.status(200).json({
            success: true,
            message: 'Create Transaction Offer successful',
            data: {
                id: req.user.id,
                ...createData
            }
        });
    },

    findbyID: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        
        const userproductOffer = await User.findByPk(req.user.id,{
            include: [{ model: ProductOffer}]
        });

        if (!userproductOffer)
            return res.status(404).json({
                success: false,
                message: `ProductOffer for this user is not found`,
                data: null
            });

        if(userproductOffer.roleId ==1){
            return res.status(200).json({
                success: true,
                message: 'You are not seller',
                data: null
            });
        }
        //console.log(userproductOffer.ProductOffers.dataValues.id)
        res.status(200).json({
            success: true,
            message: 'ProductOffer found',
            data: userproductOffer.ProductOffers
        });
    }
};
