const express = require('express');
const { param } = require('express-validator');
const passport = require('../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../controllers/error');
const { findByUser, update } = require('../../controllers/notification');

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
            param('id')
                .notEmpty()
                .withMessage('Id harus diisi')
                .isInt()
                .withMessage('Id harus berupa angka')
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
