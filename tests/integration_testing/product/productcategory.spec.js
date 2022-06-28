const request = require('supertest');
const app = require('../../../app');
require('../../../controllers/productcategory');

describe('GET /api/v1/products/categories', () => {
    it('200 OK', async () => {
        const res = await request(app)
            .get('/api/v1/products/categories')
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Kategori ditemukan');
    });
});
