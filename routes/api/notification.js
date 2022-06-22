const express = require('express');
const { findAll } = require('../../controllers/notification');
const { methodNotAllowed } = require('../../controllers/error');

const router = express.Router();

router.route('/').get(findAll).all(methodNotAllowed);

module.exports = router;
