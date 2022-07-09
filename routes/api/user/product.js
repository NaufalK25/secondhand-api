const multer = require('multer');
const { Router } = require('express');
const { body, query } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const {
    create,
    findBySeller,
} = require('../../../controllers/product');
const { productStorage } = require('../../../middlewares/file');

const router = Router();

router
    .route('/products')
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
        [
            query('sortBy')
                .trim()
                .isString()
                .withMessage('Sort by harus berupa huruf')
        ],
        findBySeller
    )
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
        multer({ storage: productStorage }).array('images'),
        [
            body('name')
                .notEmpty()
                .withMessage('Nama produk harus diisi')
                .trim()
                .isString()
                .withMessage('Nama produk harus berupa huruf'),
            body('price')
                .notEmpty()
                .withMessage('Harga harus diisi')
                .isNumeric()
                .withMessage('Harga harus berupa angka'),
            body('categories').custom(value => {
                if (!value) throw new Error('Kategori harus diisi');
                if (typeof value === 'string') value = value.split(',');
                if (value.length < 1) throw new Error('Kategori harus diisi');
                if (value.length > 5)
                    throw new Error(
                        'Kategori harus lebih kurang dari atau sama dengan 5'
                    );
                return true;
            }),
            body('categories.*')
                .notEmpty()
                .withMessage('Kategori harus diisi')
                .trim()
                .isInt()
                .withMessage('Kategori harus berupa angka'),
            body('description')
                .notEmpty()
                .withMessage('Deskripsi harus diisi')
                .trim()
                .isString()
                .withMessage('Deskripsi harus berupa huruf'),
            body('images').custom((value, { req }) => {
                if (req.files.length < 1) {
                    throw new Error('Foto harus diisi');
                }
                if (req.files.length > 4)
                    throw new Error(
                        'Foto harus lebih kurang dari atau sama dengan 4'
                    );
                return true;
            })
        ],
        create
    )
    .all(methodNotAllowed);

module.exports = router;
