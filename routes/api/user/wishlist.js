const express = require('express');
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
    findByUser
} = require('../../../controllers/wishlist');
const { Wishlist } = require('../../../models');

const router = express.Router();

router
    .route('/wishlists')
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
                .withMessage('productId is required')
                .isInt()
                .withMessage('productId must be an integer')
                .custom(async (value, { req }) => {
                    const wishlist = await Wishlist.findOne({
                        where: { userId: req.user.id, productId: value }
                    });

                    if (wishlist) {
                        throw new Error('Product already in wishlist');
                    }
                })
        ],
        create
    )
    .all(methodNotAllowed);

router
    .route('/wishlist/:id')
    .delete(
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
        param('id').isInt().withMessage('Id must be an integer'),
        destroy
    )
    .all(methodNotAllowed);

module.exports = router;
