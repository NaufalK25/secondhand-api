const express = require('express');
const multer = require('multer');
const { body, param } = require('express-validator');
const passport = require('../middlewares/passport');
const { forbidden, internalServerError, methodNotAllowed,
  notFound, unAuthorized } = require('../controllers/error');
const { findAll,update} = require('../controllers/profile');
const { Profile } = require('../models');
const { profileStorage } = require('../middlewares/file');


const router = express.Router();

//router.get('/view-profile',findAll);
router.route('/view-profile').get(
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) return internalServerError(err, req, res);
        if (!user) return unAuthorized(req, res);
        if (user.roleId === 1) return next();
        const profile = await Profile.findByPk(req.query.id);
        if (!profile) return notFound(req, res);
        if (user.id !== req.body.id) return forbidden(req, res);
        next();
    })(req, res, next)},findAll)
    
router.route('/info-profile')
    // .get([
    //     param('id').isInt().withMessage('Id must be an integer')
    // ], findOne)
    .put((req, res, next) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) return internalServerError(err, req, res);
            if (!user) return unAuthorized(req, res);
            if (user.roleId === 1) return next();
            const profile = await Profile.findByPk(req.query.id);
            if (!profile) return notFound(req, res);
            if (user.id !== req.body.id) return forbidden(req, res);
            next();
        })(req, res, next);
    }, multer({ storage: profileStorage }).single('profilePicture'), [
        param('id').isInt().withMessage('Id must be an integer'),
        body('name')
          .notEmpty()
          .withMessage('Name is required')
          .trim()
          .isString()
          .withMessage('Name must be a string'),
        body('phoneNumber')
          .notEmpty()
          .withMessage('phoneNumber is required'),
        // body('cityId')
        //   .notEmpty()
        //   .withMessage('cityId is required')
        //   .trim()
        //   .isInt()
        //   .withMessage('cityId must be a integer'),
        body('address')
          .notEmpty()
          .withMessage('address is required')
          .trim()
          .isString()
          .withMessage('address must be a string'),
    ], update)
    .all(methodNotAllowed);

router.post(
  '/info-profiles',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .trim()
      .isString()
      .withMessage('Name must be a string'),
    body('phoneNumber')
      .notEmpty()
      .withMessage('phoneNumber is required'),
    // body('cityId')
    //   .notEmpty()
    //   .withMessage('cityId is required')
    //   .trim()
    //   .isInt()
    //   .withMessage('cityId must be a integer'),
    body('address')
      .notEmpty()
      .withMessage('address is required')
      .trim()
      .isString()
      .withMessage('address must be a string'),
  ],
  update
);

module.exports = router;
