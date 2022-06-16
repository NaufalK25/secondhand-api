const { Router } = require('express');
const authRouter = require('./auth');
<<<<<<< HEAD
const productRouter = require('./products');
const profileRouter = require('./profile');
const city = require('./city');
=======
const productRouter = require('./product');
const userController = require('./user');
>>>>>>> 089f85f364ec26b2261161edf302e851aa1a0d5d

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
<<<<<<< HEAD
router.use(city);
=======
router.use('/user', userController);

>>>>>>> 089f85f364ec26b2261161edf302e851aa1a0d5d

module.exports = router;
