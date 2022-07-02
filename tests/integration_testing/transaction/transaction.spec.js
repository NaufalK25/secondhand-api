const request = require('supertest');
const app = require('../../../app');
require('../../../controllers/productoffer');
const buffer = Buffer.from('../../../uploads/profiles');

process.env.NODE_ENV = 'test';

beforeAll(async () => {
    //login seller
    const seller = await request(app).post('/api/v1/auth/login').send({
        email: 'secondhand06msibseller@mail.com',
        password: '@Secondhand06'
    });
    gettokenseller = seller.res.rawHeaders[7];
    let resultseller = gettokenseller.slice(6);
    const finalresultseller = resultseller.replace('; Path=/', '');
    tokenseller = finalresultseller;
    await request(app).post('/api/v1/auth/register').send({
        name: 'Second Hand Testing',
        email: 'secondhand06msib@mail.com',
        password: '@Secondhand06'
    });
    const login = await request(app).post('/api/v1/auth/login').send({
        email: 'secondhand06msib@mail.com',
        password: '@Secondhand06'
    });
    gettoken = login.res.rawHeaders[7];
    let result = gettoken.slice(6);
    const finalresult = result.replace('; Path=/', '');
    token = finalresult;
});

afterAll(async () => {
    try {
        //await request(app).get('/api/v1/auth/logout').set('Authorization',`Bearer ${token}`)
    } catch (error) {
        console.log(error);
    }
});

describe('GET /api/v1/transactions (Buyer)', () => {
    it('200 OK', async () => {
        const res = await request(app)
            .get('/api/v1/transactions')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Transaksi ditemukan');
    });

    it('401 unauthoreized', async () => {
        const res = await request(app).get('/api/v1/transactions');
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});

describe('GET /api/v1/transactions (Seller)', () => {
    it('200 OK', async () => {
        const res = await request(app)
            .get('/api/v1/transactions')
            .set('Authorization', `Bearer ${tokenseller}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Transaksi ditemukan');
    });
    it('401 unauthoreized', async () => {
        const res = await request(app).get('/api/v1/transactions');
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});

describe('PUT /api/v1/transactions/:id', () => {
    it('200 OK', async () => {
        const res = await request(app)
            .put('/api/v1/transactions/1')
            .set('Authorization', `Bearer ${tokenseller}`)
            .send({
                status: true
            });
        expect(res.statusCode).toEqual(200);
        //expect(res.body.message).toEqual('Profil berhasil diperbarui')
    });

    it('400 Bad Request', async () => {
        const res = await request(app)
            .put('/api/v1/transactions/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });

    it('401 unauthoreized', async () => {
        const res = await request(app).put('/api/v1/transactions/1').send({
            status: true
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});
