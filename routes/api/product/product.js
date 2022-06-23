const express = require('express');
const multer = require('multer');
const { body, query } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const {
    create,
    filterByCategory,
    findAll,
    search
} = require('../../../controllers/product');
const { productStorage } = require('../../../middlewares/file');

const router = express.Router();

router
    .route('/filter')
    .get(
        [
            query('category')
                .notEmpty()
                .withMessage('Category is required')
                .trim()
                .isString()
                .withMessage('Category must be a string')
        ],
        filterByCategory
    )
    .all(methodNotAllowed);

router
    .route('/search')
    .get(
        [
            query('keyword')
                .notEmpty()
                .withMessage('keyword is required')
                .trim()
                .isString()
                .withMessage('keyword must be a string')
        ],
        search
    )
    .all(methodNotAllowed);

router
    .route('/')
    .get(findAll)
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
            body('categories').custom(value => {
                if (!value) throw new Error('categories is required');
                if (typeof value === 'string') value = value.split(',');
                if (value.length < 1) throw new Error('categories is required');
                if (value.length > 5)
                    throw new Error(
                        'categories must be less than or equal to 5'
                    );
                return true;
            }),
            body('categories.*')
                .notEmpty()
                .withMessage('categories is required')
                .trim()
                .isInt()
                .withMessage('categories must be an integer'),
            body('name')
                .notEmpty()
                .withMessage('name is required')
                .trim()
                .isString()
                .withMessage('name must be a string'),
            body('price')
                .notEmpty()
                .withMessage('price is required')
                .isNumeric()
                .withMessage('price must be a number'),
            body('stock')
                .notEmpty()
                .withMessage('stock is required')
                .isInt()
                .withMessage('stock must be an integer'),
            body('description')
                .notEmpty()
                .withMessage('description is required')
                .trim()
                .isString()
                .withMessage('description must be a string'),
            body('status')
                .notEmpty()
                .withMessage('status is required')
                .trim()
                .isBoolean()
                .withMessage('status must be a boolean'),
            body('images').custom((value, { req }) => {
                if (req.files.length < 1) {
                    throw new Error('images is required');
                }
                if (req.files.length > 4)
                    throw new Error('images must be less than or equal to 4');
                return true;
            })
        ],
        create
    )
    .all(methodNotAllowed);

module.exports = router;
