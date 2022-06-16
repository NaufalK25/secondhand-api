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
    .route('/profile/:id')
    .get(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (!user) return unAuthorized(req, res);
                    if (+req.params.id) {
                        const profile = await Profile.findByPk(+req.params.id);
                        if (!profile || profile.userId !== user.id)
                            return forbidden(req, res);
                    }
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        [param('id').isInt().withMessage('Id must be an integer')],
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
                    const profile = await Profile.findByPk(+req.params.id);
                    if (!profile) return notFound(req, res);
                    if (!profile || profile.userId !== user.id)
                        return forbidden(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        multer({ storage: profileStorage }).single('profilePicture'),
        [
            param('id').isInt().withMessage('Id must be an integer'),
            body('name')
                .optional()
                .trim()
                .isString()
                .withMessage('Name must be a string'),
            body('phoneNumber')
                .notEmpty()
                .withMessage('phoneNumber is required'),
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
                .withMessage('address must be a string'),
            body('userId')
                .notEmpty()
                .withMessage('userId is required')
                .isInt()
                .withMessage('userId must be an integer')
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
