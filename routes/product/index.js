const express = require('express');
const categoryRouter = require('./productcategory');
const productRouter = require('./product');
const offerRouter = require('./productoffer');

const router = express.Router();

router.use(categoryRouter); // /categories
router.use(offerRouter); // /offer
router.use(productRouter); // /


module.exports = router;
