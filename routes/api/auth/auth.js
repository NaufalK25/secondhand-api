const bcrypjs = require('bcryptjs');
const { Router } = require('express');
const { body } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    forgotPassword,
    login,
    logout,
    register,
    resetPassword
} = require('../../../controllers/auth');
const {
    forbidden,
    internalServerError,
    methodNotAllowed
} = require('../../../controllers/error');
const { User } = require('../../../models');

const router = Router();

router
    .route('/login')
    .post(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (user) return forbidden(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [
            body('email')
                .notEmpty()
                .withMessage('Email harus diisi')
                .trim()
                .isEmail()
                .withMessage('Email tidak valid')
                .custom(async value => {
                    const user = await User.findOne({
                        where: { email: value }
                    });
                    if (!user) throw new Error('Email tidak terdaftar');
                }),
            body('password')
                .notEmpty()
                .withMessage('Password harus diisi')
                .trim()
                .isString()
                .withMessage('Password harus berupa huruf')
                .custom(async (value, { req }) => {
                    const user = await User.findOne({
                        where: { email: req.body.email }
                    });
                    if (!(await bcrypjs.compare(value, user.password)))
                        throw new Error('Password salah');
                })
        ],
        login
    )
    .all(methodNotAllowed);

router
    .route('/logout')
    .post((req, res, next) => {
        passport.authenticate(
            'jwt',
            { session: false },
            async (err, user, info) => {
                if (err) return internalServerError(err, req, res);
                if (!user) return forbidden(req, res);
                req.user = user;
                next();
            }
        )(req, res, next);
    }, logout)
    .all(methodNotAllowed);

router
    .route('/register')
    .post(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (user) return forbidden(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [
            body('name')
                .notEmpty()
                .withMessage('Nama harus diisi')
                .trim()
                .isString()
                .withMessage('Nama harus berupa huruf'),
            body('email')
                .notEmpty()
                .withMessage('Email harus diisi')
                .trim()
                .isEmail()
                .withMessage('Email tidak valid')
                .custom(async value => {
                    const user = await User.findOne({
                        where: { email: value }
                    });
                    if (user) throw new Error('Email sudah terdaftar');
                }),
            body('password')
                .notEmpty()
                .withMessage('Password harus diisi')
                .trim()
                .isString()
                .withMessage('Password harus berupa huruf')
                .isLength({ min: 8 })
                .withMessage('Password minimal 8 karakter')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
                )
                .withMessage(
                    'Password minimal terdiri dari 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter spesial'
                )
        ],
        register
    )
    .all(methodNotAllowed);

router
    .route('/forgot-password')
    .post(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (user) return forbidden(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [
            body('email')
                .notEmpty()
                .withMessage('Email harus diisi')
                .trim()
                .isEmail()
                .withMessage('Email tidak valid')
                .custom(async value => {
                    const user = await User.findOne({
                        where: { email: value }
                    });
                    if (!user) throw new Error('Email tidak terdaftar');
                })
        ],
        forgotPassword
    )
    .all(methodNotAllowed);

router
    .route('/reset-password')
    .post(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (user) return forbidden(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [
            body('email')
                .notEmpty()
                .withMessage('Email harus diisi')
                .trim()
                .isEmail()
                .withMessage('Email tidak valid')
                .custom(async value => {
                    const user = await User.findOne({
                        where: { email: value }
                    });
                    if (!user) throw new Error('Email tidak terdaftar');
                }),
            body('token')
                .notEmpty()
                .withMessage('Token harus diisi')
                .trim()
                .isString()
                .withMessage('Token harus berupa huruf'),
            body('password')
                .notEmpty()
                .withMessage('Password harus diisi')
                .trim()
                .isString()
                .withMessage('Password harus berupa huruf')
                .isLength({ min: 8 })
                .withMessage('Password minimal 8 karakter')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
                )
                .withMessage(
                    'Password minimal terdiri dari 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter spesial'
                )
        ],
        resetPassword
    )
    .all(methodNotAllowed);

module.exports = router;
