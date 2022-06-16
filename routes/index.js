const { Router } = require('express');
const authRouter = require('./auth');
const productRouter = require('./products');
const profileRouter = require('./profile');
const city = require('./city');

const router = Router();

router.use(authRouter);
router.use(profileRouter);
router.use('/products', productRouter);
router.use(city);

module.exports = router;
