const { Router } = require('express');
const authRouter = require('./auth');
const productRouter = require('./product');
const userController = require('./user');

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/user', userController);


module.exports = router;
