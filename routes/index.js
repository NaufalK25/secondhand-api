const swaggerUi = require('swagger-ui-express');
const { Router } = require('express');
const swaggerDocument = require('../docs/swagger.json');
const {
    internalServerError,
    notFoundDefault
} = require('../controllers/error');
const apiRouter = require('./api');

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/api/v1', apiRouter);

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
