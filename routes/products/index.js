const express = require('express');
const categoryRouter = require('./productcategory');
const productRouter = require('./product');

const router = express.Router();

router.use(categoryRouter);
router.use(productRouter);

module.exports = router;
