const express = require('express');
const { param, query } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const { findBySeller, findById } = require('../../../controllers/product');

const router = express.Router();

router
    .route('/products/:id')
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
        [param('id').isInt().withMessage('id must be an integer')],
        findById
    )
    .all(methodNotAllowed);

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
                .withMessage('sortBy must be a string')
        ],
        findBySeller
    )
    .all(methodNotAllowed);

module.exports = router;
