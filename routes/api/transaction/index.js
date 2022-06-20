const express = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../../controllers/error');
const transactionRouter = require('./transaction');

const router = express.Router();

router.use(transactionRouter); // /

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
