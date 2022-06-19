const express = require('express');
const { methodNotAllowed } = require('../../../controllers/error');
const { findAll } = require('../../../controllers/productcategory');

const router = express.Router();

router.route('/categories').get(findAll).all(methodNotAllowed);

module.exports = router;
