const express = require('express');
const categoryRouter = require('./productcategory');
const productRouter = require('./product');

const router = express.Router();

router.use(productRouter); // /
router.use(categoryRouter); // /categories

module.exports = router;
