const express = require('express');
const multer = require('multer');
const { body, param } = require('express-validator');
const passport = require('../../middlewares/passport');
const {
    forbidden,
    internalServerError,
    methodNotAllowed,
    notFound,
    unAuthorized
} = require('../../controllers/error');
const { findbyID, update } = require('../../controllers/profile');
const { profileStorage } = require('../../middlewares/file');
const { Profile } = require('../../models');

const router = express.Router();

router
    .route('/profile')
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
        multer({ storage: profileStorage }).single('profilePicture'),
        [
            body('name')
                .optional()
                .trim()
                .isString()
                .withMessage('Name must be a string'),
            body('phoneNumber')
                .notEmpty()
                .withMessage('phoneNumber is required')
                .custom(async value => {
                    const phone = await Profile.findOne({
                        where: { phoneNumber: value }
                    });
                    if (phone) {
                        throw new Error('phoneNumber already exists');
                    }
                }),
            body('cityId')
                .notEmpty()
                .withMessage('cityId is required')
                .trim()
                .isInt()
                .withMessage('cityId must be an integer'),
            body('address')
                .notEmpty()
                .withMessage('address is required')
                .trim()
                .isString()
                .withMessage('address must be a string')
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
