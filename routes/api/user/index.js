const { Router } = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../../controllers/error');
const productRouter = require('./product');
const profileRouter = require('./profile');
const wishlistRouter = require('./wishlist');

const router = Router();

router.use(productRouter); // /products
router.use(profileRouter); // /profile
router.use(wishlistRouter); // /wishlists /wishlist

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
