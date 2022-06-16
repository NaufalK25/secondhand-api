const express = require('express');
const authRouter = require('./auth');

const router = express.Router();

router.use(authRouter); // /login, /logout, /register

module.exports = router;
