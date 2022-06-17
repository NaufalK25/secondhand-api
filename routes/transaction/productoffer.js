const express = require('express');
const passport = require('../../middlewares/passport');
const { body, query } = require('express-validator');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../controllers/error');
const { findbyID, create } = require('../../controllers/productoffer');

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
        findbyID
    )
    
    .all(methodNotAllowed);

module.exports = router;
