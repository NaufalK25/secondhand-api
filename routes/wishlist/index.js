const express = require('express');
const passport = require('../../middlewares/passport');
const { body, query } = require('express-validator');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../controllers/error');
const { findbyID, create } = require('../../controllers/wishlist');

const router = express.Router();

router
    .route('/')
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
        [query('userId').isInt().withMessage('Id must be an integer')],
        findbyID
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
        [
            body('userId')
                .notEmpty()
                .withMessage('userId is required')
                .isInt()
                .withMessage('userId must be an integer'),
            body('productId')
                .notEmpty()
                .withMessage('productId is required')
                .isInt()
                .withMessage('productId must be an integer')
        ],
        create
    )
    .all(methodNotAllowed);

module.exports = router;
