const { Router } = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../../controllers/error');
const categoryRouter = require('./productcategory');
const productRouter = require('./product');
const offerRouter = require('./productoffer');

const router = Router();

router.use(categoryRouter); // /categories
router.use(offerRouter); // /offers /offer/:id
router.use(productRouter); // /

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
