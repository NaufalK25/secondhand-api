const bcrypjs = require('bcryptjs');
const { Router } = require('express');
const { body } = require('express-validator');
const passport = require('../../../middlewares/passport');
const { login, logout, register } = require('../../../controllers/auth');
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
                .withMessage('Email is required')
                .trim()
                .isEmail()
                .withMessage('Email must be valid')
                .custom(async value => {
                    const user = await User.findOne({
                        where: { email: value }
                    });
                    if (!user) {
                        throw new Error('Email not found');
                    }
                }),
            body('password')
                .notEmpty()
                .withMessage('Password is required')
                .trim()
                .isString()
                .withMessage('Password must be a string')
                .isLength({ min: 8 })
                .withMessage('Password must be at least 8 characters long')
                .custom(async (value, { req }) => {
                    const user = await User.findOne({
                        where: { email: req.body.email }
                    });
                    if (!(await bcrypjs.compare(value, user.password))) {
                        throw new Error('Password is incorrect');
                    }
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
                .withMessage('Name is required')
                .trim()
                .isString()
                .withMessage('Name must be a string'),
            body('email')
                .notEmpty()
                .withMessage('Email is required')
                .trim()
                .isEmail()
                .withMessage('Email must be valid')
                .custom(async value => {
                    const user = await User.findOne({
                        where: { email: value }
                    });
                    if (user) {
                        throw new Error('Email already exists');
                    }
                }),
            body('password')
                .notEmpty()
                .withMessage('Password is required')
                .trim()
                .isString()
                .withMessage('Password must be a string')
                .isLength({ min: 8 })
                .withMessage('Password must be at least 8 characters long')
        ],
        register
    )
    .all(methodNotAllowed);

module.exports = router;
