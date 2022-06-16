// const express = require('express');
// const controller = require('../controllers/city');



// module.exports = router;
const express = require('express');
const { methodNotAllowed } = require('../controllers/error');
const { getAll } = require('../controllers/city');

const router = express.Router();

router.route('/city').get(getAll).all(methodNotAllowed);

module.exports = router;