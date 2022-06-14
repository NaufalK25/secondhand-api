const { Router } = require('express');
const authRouter = require('./auth');
const profileRouter = require('./profile');

const router = Router();

router.use(authRouter);
router.use(profileRouter);

module.exports = router;
