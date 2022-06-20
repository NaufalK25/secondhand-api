const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const { findByUser, update } = require('../../../controllers/transaction');
const { Product, Transaction } = require('../../../models');
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
    }, findByUser)
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
                    const userTransaction = await Transaction.findByPk(
                        req.params.id,
                        {
                            include: [
                                { model: Product }
                            ]
                        }
                    );
                    if (user.id !== userTransaction.Product.sellerId)
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
