const request = require('supertest');
const app = require('../../app');
require('../../controllers/city');

process.env.NODE_ENV = 'test';

describe('GET /api/v1/city', () => {
     it('200 OK', async () => {
        const res = await request(app).get('/api/v1/cities')
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Kota ditemukan')

    });
});

