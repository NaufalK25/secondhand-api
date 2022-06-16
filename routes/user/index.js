const express = require('express');
const profileRouter = require('./profile');
const wishlistRouter = require('./wishlist');

const router = express.Router();

router.use(profileRouter); // /profile
router.use(wishlistRouter); // /wishlist

module.exports = router;
