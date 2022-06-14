const { Router } = require('express');
const authRouter = require('./auth');

const router = Router();

router.use(authRouter);

module.exports = router;