const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    forbidden,
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const {
    create,
    findByUser,
    update
} = require('../../../controllers/productoffer');
const { Product, ProductOffer, User } = require('../../../models');

const router = express.Router();

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
    .all(methodNotAllowed);

router
    .route('/offer/:id')
    .put(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (!user) return unAuthorized(req, res);
                    const userProductOffer = await ProductOffer.findByPk(
                        req.params.id,
                        {
                            include: [
                                { model: Product, include: [{ model: User }] }
                            ]
                        }
                    );
                    if (user.id !== userProductOffer.Product.sellerId)
                        return forbidden(
                            req,
                            res,
                            'You are not allowed to update this data'
                        );
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [
            param('id').isInt().withMessage('Id must be an integer'),
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