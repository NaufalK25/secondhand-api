const fs = require('fs/promises');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { badRequest, forbidden, notFound } = require('../controllers/error');
const {
    City,
    Profile,
    Product,
    ProductCategory,
    ProductCategoryThrough,
    ProductResource,
    User,
    Wishlist,
    sequelize
} = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const products = await Product.findAll({
            include: [
                { model: ProductCategory, through: { attributes: [] } },
                { model: ProductResource }
            ]
        });

        if (products.length === 0)
            return notFound(req, res, 'Product not found');

        products.forEach(product => {
            if (product.ProductResources) {
                product.ProductResources.forEach(resource => {
                    resource.filename = `${req.protocol}://${req.get(
                        'host'
                    )}/images/products/${resource.filename}`;
                });
            }
        });

        res.status(200).json({
            success: true,
            message: 'Product found',
            data: products
        });
    },
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (req.files) {
                req.files.forEach(async file => {
                    await fs.unlink(file.path);
                });
            }

            return badRequest(errors.array(), req, res);
        }

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

        if (categories.length > 0) {
            categories.forEach(async categoryId => {
                await ProductCategoryThrough.create({
                    productId: product.id,
                    productCategoryId: categoryId
                });
            });
        }

        if (productResources.length > 0) {
            productResources.forEach(async productResource => {
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
    findBySeller: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        let orders = [['createdAt', 'DESC']];
        if (req.query.sortBy) {
            const sortBy = req.query.sortBy;
            if (sortBy === 'sold') {
                orders.unshift(['sold', 'DESC']);
            } else if (sortBy === 'wishlist') {
                orders.unshift([
                    sequelize.fn('count', sequelize.col('Wishlists.id')),
                    'DESC'
                ]);
            }
        }

        const products = await Product.findAll({
            where: { sellerId: req.user.id },
            include: [
                { model: ProductCategory, through: { attributes: [] } },
                { model: ProductResource },
                { model: Wishlist, attributes: [] }
            ],
            group: [
                'ProductResources.id',
                'ProductCategories.id',
                'Product.id',
                'Wishlists.id',
                'Wishlists.productId'
            ],
            order: orders
        });

        if (products.length === 0)
            return notFound(req, res, 'Product not found');

        products.forEach(product => {
            if (product.ProductResources) {
                product.ProductResources.forEach(resource => {
                    resource.filename = `${req.protocol}://${req.get(
                        'host'
                    )}/images/products/${resource.filename}`;
                });
            }
        });

        res.status(200).json({
            success: true,
            message: 'Product found',
            data: products
        });
    },
    findById: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: ProductCategory, through: { attributes: [] } },
                { model: ProductResource },
                {
                    model: User,
                    include: [{ model: Profile, include: [{ model: City }] }]
                }
            ]
        });

        if (!product) return notFound(req, res, 'Product not found');

        if (product.ProductResources) {
            product.ProductResources.forEach(resource => {
                resource.filename = `${req.protocol}://${req.get(
                    'host'
                )}/images/products/${resource.filename}`;
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product found',
            data: product
        });
    },
    search: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { keyword } = req.query;

        const products = await Product.findAll({
            where: { name: { [Op.like]: `%${keyword}%` } }
        });

        if (products.length === 0)
            return notFound(req, res, 'Product not found');

        res.status(200).json({
            success: true,
            message: 'Product found',
            data: products
        });
    }
};
