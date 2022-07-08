const multer = require('multer');
const { Router } = require('express');
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

const router = Router();

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
                .isLength({ min: 7 })
                .withMessage('Nomor telepon minimal 7 digit')
                .isNumeric()
                .withMessage('Nomor telepon harus berupa angka')
                .custom(async (value, { req }) => {
                    const user = await Profile.findOne({
                        where: { phoneNumber: value }
                    });
                    if (user && user.userId !== req.user.id)
                        throw new Error('Nomor telepon sudah terdaftar');
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
                .isLength({ min: 5 })
                .withMessage('Alamat minimal 5 karakter')
                .custom(value => {
                    if (/^\d+$/.test(value))
                        throw new Error(
                            'Alamat tidak boleh hanya berupa angka'
                        );
                    return true;
                })
        ],
        update
    )
    .all(methodNotAllowed);

module.exports = router;
