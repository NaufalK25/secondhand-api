const { Router } = require('express');
const { findAll } = require('../../controllers/city');
const { methodNotAllowed } = require('../../controllers/error');

const router = Router();

router.route('/').get(findAll).all(methodNotAllowed);

module.exports = router;
