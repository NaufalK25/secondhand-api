const bcrypjs = require('bcryptjs');
const { Router } = require('express');
const { body } = require('express-validator');
const { login, logout, register } = require('../../controllers/auth');
const { methodNotAllowed } = require('../../controllers/error');
const { User } = require('../../models');

const router = Router();

router
    .route('/login')
    .post(
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

router.route('/logout')
    .post(logout)
    .all(methodNotAllowed);

router
    .route('/register')
    .post(
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
