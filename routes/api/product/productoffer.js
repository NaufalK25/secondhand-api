const { Router } = require('express');
const { body, param } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const {
    create,
    findById,
    findByUser,
    update
} = require('../../../controllers/productoffer');
const { Product } = require('../../../models');

const router = Router();

router
    .route('/offers')
    .get((req, res, next) => {
        passport.authenticate(
            'jwt',
            { session: false },
            async (err, user, info) => {
                if (err) return internalServerError(err, req, res);
                if (!user) return unAuthorized(req, res);
                req.user = user;
                next();
            }
        )(req, res, next);
    }, findByUser)
    .post(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (!user) return unAuthorized(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [
            body('productId')
                .notEmpty()
                .withMessage('Id produk harus diisi')
                .isInt()
                .withMessage('Id produk harus berupa angka'),
            body('priceOffer')
                .notEmpty()
                .withMessage('Harga tawar harus diisi')
                .isInt()
                .withMessage('Harga tawar harus berupa angka')
                .custom(async (value, { req }) => {
                    const product = await Product.findByPk(req.body.productId);
                    if (!product) return true;
                    if (value > product.price) {
                        throw new Error(
                            'Harga tawar tidak boleh melebihi harga produk'
                        );
                    }
                    return true;
                })
        ],
        create
    )
    .all(methodNotAllowed);

router
    .route('/offer/:id')
    .get(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (!user) return unAuthorized(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [param('id').isInt().withMessage('Id harus berupa angka')],
        findById
    )
    .put(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (!user) return unAuthorized(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [
            param('id').isInt().withMessage('Id harus berupa angka'),
            body('status')
                .notEmpty()
                .withMessage('Status harus diisi')
                .trim()
                .isBoolean()
                .withMessage('Status harus berupa nilai benar atau salah')
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
