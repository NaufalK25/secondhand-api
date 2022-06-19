const express = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../../controllers/error');
const authRouter = require('./auth');

const router = express.Router();

router.use(authRouter); // /login, /logout, /register

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
