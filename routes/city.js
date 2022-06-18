const express = require('express');
const { methodNotAllowed } = require('../controllers/error');
const { findAll } = require('../controllers/city');

const router = express.Router();

router.route('/').get(findAll).all(methodNotAllowed);

module.exports = router;
