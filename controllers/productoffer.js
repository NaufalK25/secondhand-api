const { validationResult } = require('express-validator');
const { User, Product, ProductOffer, Transaction } = require('../models');
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
    let userProductOffer;
    if(req.user.roleId == 2){ //kalo dia seller dia bakal nampilin penawaran yang diajuin buyer
        userProductOffer = await ProductOffer.findAll({include: [{ model: Product, attributes: [], where: { sellerId: req.user.id }}]});
    }else{ //kalo dia buyyer dia bakal nampilin produk yang lagi dia tawar
        userProductOffer = await ProductOffer.findAll({ where: { buyerId: req.user.id } });
    }
        res.status(200).json({
            success: true,
            message: 'Product Offer found',
            data: userProductOffer
        });
    },
    
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const userProductOffer = await ProductOffer.findByPk(req.query.id, {include: [{ model: Product,  include: [{ model: User }] }]});
        const updatedData = {};
        if (!userProductOffer) return notFound(req, res);

        if (req.body.status)
            updatedData.status = req.body.status || userProductOffer.status;

        if(req.user.id == userProductOffer.Product.sellerId){ //yang bisa update login yang sebagai seller produk itu)
            await ProductOffer.update(updatedData, { where: { id: req.query.id } });
            if(updatedData.status == "Accept"){
                // TODO make transaction kalo diterima tawarannya sama seller dia langsung ke proses transaksi
                await Transaction.create({
                    productId: userProductOffer.productId,
                    buyerId: userProductOffer.buyerId,
                    transactionDate: new Date(),
                    fixPrice: userProductOffer.priceOffer,
                    status: "Pending"
                });
            }

            res.status(200).json({
                success: true,
                message: 'Update status successful',
                data: {
                    id: req.user.id,
                    ...updatedData
                }
            });
        }else{
            res.status(200).json({
                success: true,
                message: 'You are not allowed to update this data',
                data: {
                    id: req.user.id,
                    ...updatedData
                }
            });
        }
        
    }
};
