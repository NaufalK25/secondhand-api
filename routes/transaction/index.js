const express = require('express');
const offerRouter = require('./productoffer');

const router = express.Router();

router.use(offerRouter); // /product offer

module.exports = router;
