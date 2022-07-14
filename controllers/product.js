const fs = require('fs/promises');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { badRequest, forbidden, notFound } = require('../controllers/error');
const {
    City,
    Notification,
    Profile,
    Product,
    ProductCategory,
    ProductCategoryThrough,
    ProductOffer,
    ProductResource,
    User,
    Wishlist,
    sequelize
} = require('../models');
const { uploadImage } = require('../utils/cloudinary');

module.exports = {
    findAll: async (req, res) => {
        const products = await Product.findAll({
            include: [
                { model: ProductCategory, through: { attributes: [] } },
                { model: ProductResource }
            ]
        });

        if (products.length === 0)
            return notFound(req, res, 'Produk tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Produk ditemukan',
            data: products
        });
    },
    create: async (req, res) => {
        const products = await Product.findAll({
            where: { sellerId: req.user.id }
        });
        if (products.length > 4)
            return forbidden(req, res, 'Anda hanya bisa memposting 4 produk');

        const { name, price, description } = req.body;
        let { categories } = req.body;
        const productResources = req.files;

        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const product = await Product.create({
            sellerId: req.user.id,
            name,
            price,
            description
        });

        if (typeof categories === 'string') categories = categories.split(',');
        if (categories.length > 0) {
            categories.forEach(async categoryId => {
                await ProductCategoryThrough.create({
                    productId: product.id,
                    productCategoryId: +categoryId
                });
            });
        }

        productResources.forEach(async (productResource, index) => {
            const { path } = productResource;
            const image = await uploadImage(
                `products/${product.id}`,
                path,
                `${product.id}-${index + 1}`
            );
            await ProductResource.create({
                productId: product.id,
                filename: image.secure_url
            });
            await fs.unlink(path);
        });

        await Notification.create({
            userId: req.user.id,
            productId: product.id,
            type: 'Berhasil di terbitkan'
        });

        res.status(201).json({
            success: true,
            message: 'Produk berhasil dibuat',
            data: product
        });
    },
    findBySeller: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { sortBy } = req.query;
        const orders = [['createdAt', 'DESC']];
        if (sortBy === 'sold') orders.unshift(['status', 'DESC']);
        if (sortBy === 'wishlist') {
            orders.unshift([
                sequelize.literal(
                    `(SELECT COUNT(*) FROM "Wishlists" WHERE "Wishlists"."productId" = "Product"."id")`
                ),
                'DESC'
            ]);
        }

        let products = await Product.findAll({
            where: { sellerId: req.user.id },
            include: [
                { model: ProductCategory, through: { attributes: [] } },
                { model: ProductResource },
                { model: Wishlist },
                { model: ProductOffer }
            ],
            order: orders
        });

        if (sortBy === 'sold')
            products = products.filter(product => product.status === false);
        if (sortBy === 'wishlist')
            products = products.filter(product => product.Wishlists.length > 0);

        if (products.length === 0)
            return notFound(req, res, 'Produk tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Produk ditemukan',
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

        if (!product) return notFound(req, res, 'Produk tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Produk ditemukan',
            data: product
        });
    },
    search: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { keyword } = req.query;
        const products = await Product.findAll({
            where: { name: { [Op.iLike]: `%${keyword}%` } },
            include: [
                { model: ProductCategory, through: { attributes: [] } },
                { model: ProductResource }
            ]
        });

        if (products.length === 0)
            return notFound(req, res, 'Produk tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Produk ditemukan',
            data: products
        });
    },
    filterByCategory: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { category } = req.query;
        const productCategory = await ProductCategory.findOne({
            where: { category: { [Op.iLike]: `%${category}%` } }
        });

        const products = await ProductCategoryThrough.findAll({
            where: { productCategoryId: productCategory.id },
            attributes: [],
            include: [
                {
                    model: Product,
                    include: [
                        { model: ProductCategory, through: { attributes: [] } },
                        { model: ProductResource }
                    ]
                }
            ]
        });

        if (products.length === 0)
            return notFound(req, res, 'Produk tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Produk ditemukan',
            data: products
        });
    }
};
