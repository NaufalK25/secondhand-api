const { Router } = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../controllers/error');
const authRouter = require('./auth');
const productRouter = require('./product');
const transactionRouter = require('./transaction');
const userRouter = require('./user');
const cityRouter = require('./city');
const notifRouter = require('./notification');

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/transactions', transactionRouter);
router.use('/user', userRouter);
router.use('/cities', cityRouter);
router.use('/notifications', notifRouter);

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
