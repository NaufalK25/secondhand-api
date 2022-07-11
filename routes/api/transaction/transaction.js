const { Router } = require('express');
const { body, param } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const {
    findById,
    findByUser,
    update
} = require('../../../controllers/transaction');

const router = Router();

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
        [param('id').isInt().withMessage('Id harus berupa angka')],
        findById
    )
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
            param('id').isInt().withMessage('Id harus berupa angka'),
            body('status')
                .notEmpty()
                .withMessage('Status harus diisi')
                .trim()
                .isBoolean()
                .withMessage('Status harus berupa nilai benar atau salah')
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
