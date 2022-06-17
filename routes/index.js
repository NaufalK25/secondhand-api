const { Router } = require('express');
const authRouter = require('./auth');
const productRouter = require('./product');
const userController = require('./user');
const city = require('./city');

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/user', userController);
router.use('/cities', city);

module.exports = router;
