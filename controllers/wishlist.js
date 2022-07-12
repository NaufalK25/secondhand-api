const { validationResult } = require('express-validator');
const { Product, User, Wishlist } = require('../models');
const { badRequest, forbidden, notFound } = require('./error');

module.exports = {
    findByUser: async (req, res) => {
        const wishlist = await Wishlist.findAll({
            where: { userId: req.user.id },
            include: [{ model: User }, { model: Product }]
        });

        if (wishlist.length === 0)
            return notFound(req, res, 'Daftar keinginan tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Daftar keinginan ditemukan',
            data: wishlist
        });
    },
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const user = await User.findByPk(req.user.id);
        if (!user) return notFound(req, res, 'Pengguna tidak ditemukan');

        const product = await Product.findByPk(req.body.productId);
        if (!product) return notFound(req, res, 'Produk tidak ditemukan');

        const newWishlist = await Wishlist.create({
            userId: req.user.id,
            productId: req.body.productId
        });

        res.status(201).json({
            success: true,
            message: 'Daftar keinginan berhasil ditambah',
            data: newWishlist
        });
    },
    destroy: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const wishlist = await Wishlist.findByPk(req.params.id);
        if (!wishlist)
            return notFound(req, res, 'Daftar keinginan tidak ditemukan');
        if (wishlist.userId !== req.user.id)
            return forbidden(
                req,
                res,
                'Anda tidak diperbolehkan untuk menghapus daftar keinginan ini'
            );

        const deletedWishlist = await Wishlist.destroy({
            where: { id: req.params.id }
        });

        res.status(200).json({
            success: true,
            message: 'Daftar keinginan berhasil dihapus',
            data: deletedWishlist
        });
    }
};
