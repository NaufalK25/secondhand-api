const { Router } = require('express');
const authRouter = require('./auth');
const productRouter = require('./products');
const profileRouter = require('./profile');
const wishlistRouter = require('./wishlist');

const router = Router();

router.use(authRouter);
router.use(profileRouter);
router.use('/products', productRouter);
router.use('/wishlists', wishlistRouter);

module.exports = router;
