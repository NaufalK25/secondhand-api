const express = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../../controllers/error');
const profileRouter = require('./profile');
const wishlistRouter = require('./wishlist');

const router = express.Router();

router.use(profileRouter); // /profile
router.use(wishlistRouter); // /wishlist

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
