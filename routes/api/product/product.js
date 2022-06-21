const express = require('express');
const multer = require('multer');
const { body, param } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const {
    create,
    destroy,
    findAll,
    update
} = require('../../../controllers/product');
const { productStorage } = require('../../../middlewares/file');

const router = express.Router();

router
    .route('/')
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
    }, findAll)
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
            body('categoryId')
                .notEmpty()
                .withMessage('sellerId is required')
                .isInt()
                .withMessage('sellerId must be an integer'),
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
        ],
        create
    )
    .all(methodNotAllowed);

router
    .route('/:id')
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
        multer({ storage: productStorage }).array('images', 4),
        [
            param('id').isInt().withMessage('id must be an integer'),
            body('categoryId')
                .optional()
                .isInt()
                .withMessage('sellerId must be an integer'),
            body('name')
                .optional()
                .trim()
                .isString()
                .withMessage('name must be a string'),
            body('price')
                .optional()
                .isNumeric()
                .withMessage('price must be a number'),
            body('stock')
                .optional()
                .isInt()
                .withMessage('stock must be an integer'),
            body('description')
                .optional()
                .trim()
                .isString()
                .withMessage('description must be a string'),
            body('status')
                .optional()
                .trim()
                .isBoolean()
                .withMessage('status must be a boolean'),
        ],
        update
    )
    .delete(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (!user) return unAuthorized(req, res);
                    req.user = user;
                }
            )(req, res, next);
        },
        [param('id').isInt().withMessage('id must be an integer')],
        destroy
    )
    .all(methodNotAllowed);

module.exports = router;
