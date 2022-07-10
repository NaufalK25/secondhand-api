const { Router } = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../../controllers/error');
const transactionRouter = require('./transaction');
const transactionHistoryRouter = require('./transactionhistory');

const router = Router();

router.use(transactionHistoryRouter); // /history
router.use(transactionRouter); // /

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
