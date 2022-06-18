const express = require('express');
const passport = require('../../middlewares/passport');
const { body,query } = require('express-validator');
const {
    forbidden,
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../controllers/error');
const { create, findByUser, update } = require('../../controllers/productoffer');
const { User, Product, ProductOffer } = require('../../models');

const router = express.Router();

router
    .route('/offer')
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
                .withMessage('productId is required')
                .isInt()
                .withMessage('productId must be an integer'),
            body('priceOffer')
                .notEmpty()
                .withMessage('userId is required')
                .isInt()
                .withMessage('userId must be an integer')
        ],
        create
    )
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
            query('id').isInt().withMessage('Id must be an integer'),
            body('status')
                .notEmpty()
                .withMessage('status is required')
                .trim()
                .isString()
                .withMessage('status must be a string')
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
