const express = require('express');
const multer = require('multer');
const { body, query } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const { create, findAll, search } = require('../../../controllers/product');
const { productStorage } = require('../../../middlewares/file');
const { User } = require('../../../models');

const router = express.Router();

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
        multer({ storage: productStorage }).array('images', 4),
        [
            body('categories.*')
                .notEmpty()
                .withMessage('categories is required')
                .isInt()
                .withMessage('categories must be an integer')
                .custom((value, { req }) => {
                    if (typeof req.body.categories === 'string') {
                        req.body.categories = req.body.categories.split(',');
                    }
                    const categories = req.body.categories;
                    if (categories.length < 1)
                        throw new Error('categories must be more than 1');
                    if (categories.length >= 5)
                        throw new Error(
                            'categories must be less than or equal to 5'
                        );
                }),
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
                if (!req.files) throw new Error('images is required');
                if (req.files.length >= 4)
                    throw new Error('images must be less than or equal to 4');
            })
        ],
        create
    )
    .all(methodNotAllowed);

module.exports = router;
