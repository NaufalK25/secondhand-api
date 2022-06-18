const { Router } = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../controllers/error');
const authRouter = require('./auth');
const productRouter = require('./product');
const userRouter = require('./user');
const cityRouter = require('./city');

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/user', userRouter);
router.use('/cities', cityRouter);

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
