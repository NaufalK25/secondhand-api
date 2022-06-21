const fs = require('fs/promises');
const { validationResult } = require('express-validator');
const { badRequest, forbidden, notFound } = require('../controllers/error');
const {
    Product,
    ProductCategory,
    ProductCategoryThrough,
    ProductResource,
    User
} = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const products = await Product.findAll({
            where: { sellerId: req.user.id },
            include: [
                {
                    model: ProductCategory,
                    through: { attributes: [] }
                },
                { model: ProductResource },
                { model: User }
            ]
        });

        if (products.length === 0)
            return notFound(req, res, 'Product not found');

        res.status(200).json({
            success: true,
            message: 'Product found',
            data: products
        });
    },
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { categories, name, price, stock, description, status } =
            req.body;
        const productResources = req.files;

        const product = await Product.create({
            sellerId: req.user.id,
            name,
            price,
            stock,
            description,
            status
        });

        categories.map(async categoryId => {
            await ProductCategoryThrough.create({
                productId: product.id,
                productCategoryId: categoryId
            });
        });

        if (productResources.length > 0) {
            productResources.map(async productResource => {
                await ProductResource.create({
                    productId: product.id,
                    filename: productResource.filename
                });
            });
        }

        res.status(201).json({
            success: true,
            message: 'Product created',
            data: product
        });
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { categories, name, price, stock, description, status } =
            req.body;
        const productResources = req.files;

        const product = await Product.findOne({
            where: { id: req.params.id, sellerId: req.user.id }
        });
        if (!product) return notFound(req, res, 'Product not found');

        await Product.update(
            {
                name,
                price,
                stock,
                description,
                status
            },
            { where: { id: req.params.id, sellerId: req.user.id } }
        );

        categories.map(async categoryId => {
            await ProductCategoryThrough.destroy({
                where: {
                    productId: product.id,
                    productCategoryId: categoryId
                }
            });
            await ProductCategoryThrough.create({
                productId: product.id,
                productCategoryId: categoryId
            });
        });

        if (productResources.length > 0) {
            const sellerProductResources = await ProductResource.findALl({
                where: { productId: product.id }
            });

            if (sellerProductResources.length < 4) {
                productResources.map(async productResource => {
                    await ProductResource.create({
                        productId: product.id,
                        filename: productResource.filename
                    });
                });
            } else {
                return forbidden(
                    req,
                    res,
                    'You can only upload 4 images per product'
                );
            }
        }

        res.status(200).json({
            success: true,
            message: 'Product updated',
            data: product
        });
    },
    destroy: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const product = await Product.findByPk(req.params.id);
        if (!product) return notFound(req, res, 'Product not found');
        if (product.sellerId !== req.user.id)
            return forbidden(
                req,
                res,
                'You are not allowed to delete this product'
            );

        const productResources = await ProductResource.findAll({
            where: { productId: product.id }
        });

        if (productResources.length > 0) {
            productResources.map(async productResource => {
                await fs.unlink(
                    `${__dirname}/../uploads/products/${productResource.filename}`
                );
                await ProductResource.destroy({
                    where: { id: productResource.id }
                });
            });
        }
        await Product.destroy({ where: { id: req.params.id } });

        res.status(200).json({
            success: true,
            message: 'Product deleted',
            data: product
        });
    }
};
