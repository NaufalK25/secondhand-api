const { Router } = require('express');
const { body } = require('express-validator');
const { updateProfile} = require('../controllers/profile');
//const { Profile } = require('../models');

const router = Router();

router.post(
  '/info-profile',
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
  updateProfile
);

module.exports = router;
