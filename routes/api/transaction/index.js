const express = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../../controllers/error');
const transactionRouter = require('./transaction');
const transactionHistoryRouter = require('./transactionhistory');

const router = express.Router();

router.use(transactionRouter); // /
router.use(transactionHistoryRouter); // /
router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
