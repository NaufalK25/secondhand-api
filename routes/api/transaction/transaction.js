const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const { findByUser, update } = require('../../../controllers/transaction');
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
                .isBoolean()
                .withMessage('status must be a boolean')
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
