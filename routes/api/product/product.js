const {Router} = require('express');
const { query } = require('express-validator');
const { methodNotAllowed } = require('../../../controllers/error');
const {
    filterByCategory,
    findAll,
    search
} = require('../../../controllers/product');

const router = Router();

router
    .route('/filter')
    .get(
        [
            query('category')
                .notEmpty()
                .withMessage('Kategori harus diisi')
                .trim()
                .isString()
                .withMessage('Kategori harus berupa huruf')
        ],
        filterByCategory
    )
    .all(methodNotAllowed);

router
    .route('/search')
    .get(
        [
            query('keyword')
                .notEmpty()
                .withMessage('Kata kunci harus diisi')
                .trim()
                .isString()
                .withMessage('Kata kunci harus berupa huruf')
        ],
        search
    )
    .all(methodNotAllowed);

router.route('/').get(findAll).all(methodNotAllowed);

module.exports = router;
