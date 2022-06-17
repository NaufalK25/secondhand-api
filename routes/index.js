const { Router } = require('express');
const authRouter = require('./auth');
const productRouter = require('./product');
const transactionRouter = require('./transaction');
const userController = require('./user');

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/transactions', transactionRouter);
router.use('/user', userController);


module.exports = router;
