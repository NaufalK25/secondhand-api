const { Router } = require('express');
const authRouter = require('./auth');
const profileRouter = require('./profile');
const categoryRouter = require('./productcategory');

const router = Router();

router.use(authRouter);
router.use(profileRouter);
router.use(categoryRouter);

module.exports = router;
