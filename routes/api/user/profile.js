const express = require('express');
const multer = require('multer');
const { body } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const { findByUser, update } = require('../../../controllers/profile');
const { profileStorage } = require('../../../middlewares/file');
const { Profile } = require('../../../models');

const router = express.Router();

router
    .route('/profile')
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
                .withMessage('Nama harus berupa huruf'),
            body('phoneNumber')
                .notEmpty()
                .withMessage('Nomor telepon harus diisi')
                .custom(async value => {
                    const user = await Profile.findOne({
                        where: { phoneNumber: value }
                    });
                    if (user) throw new Error('Nomor telepon sudah terdaftar');
                }),
            body('cityId')
                .notEmpty()
                .withMessage('Id kota harus diisi')
                .trim()
                .isInt()
                .withMessage('Id kota harus berupa angka'),
            body('address')
                .notEmpty()
                .withMessage('Alamat harus diisi')
                .trim()
                .isString()
                .withMessage('Alamat harus berupa huruf')
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
