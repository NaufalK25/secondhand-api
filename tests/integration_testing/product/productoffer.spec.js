const request = require('supertest');
const app = require('../../../app');
require('../../../controllers/productoffer');

describe('POST /api/v1/products/offers', () => {
    beforeAll(async () => {
        await request(app).post('/api/v1/auth/register').send({
            name: 'Second Hand Test',
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

     it('200 OK', async () => {
     const res = await request(app)
      .post('/api/v1/products/offers')
      .set('Authorization',`Bearer ${token}`)
      .send({
        productId: 1,
        priceOffer: 10000,
      })
      
    expect(res.statusCode).toEqual(201)
    expect(res.body.message).toEqual('Penawaran produk berhasil dibuat')
    })
    it('400 Bad Request', async () => {
        const res = await request(app)
            .post('/api/v1/products/offers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    it('404 Not Found', async () => {
        const res = await request(app)
            .post('/api/v1/products/offers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: 10,
                priceOffer: 10000,
            });
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Produk tidak ditemukan');
    });
    it('401 unauthoreized', async () => {
        const res = await request(app).post('/api/v1/products/offers').send({
            name: 'John Doe',
            phoneNumber: '081234567890',
            cityId: 1,
            address: 'Jl. Kebon Jeruk No. 1'
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});

describe('GET /api/v1/products/offers (Buyer)', () => {
    beforeAll(async () => {
        await request(app).post('/api/v1/auth/register').send({
            name: 'Second Hand Test',
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

    it('200 OK', async () => {
        const res = await request(app)
            .get('/api/v1/products/offers')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Penawaran produk ditemukan');
    });

    it('401 unauthoreized', async () => {
        const res = await request(app).get('/api/v1/products/offers');
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});

describe('GET /api/v1/products/offers (Seller)', () => {
    beforeAll(async () => {
        const login = await request(app).post('/api/v1/auth/login').send({
            email: 'usersecret@gmail.com',
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

    it('200 OK', async () => {
        const res = await request(app)
            .get('/api/v1/products/offers')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Penawaran produk ditemukan');
    });
    it('401 unauthoreized', async () => {
        const res = await request(app).get('/api/v1/products/offers');
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});

describe('PUT /api/v1/products/offers/:id', () => {
    beforeAll(async () => {
        await request(app).post('/api/v1/auth/register').send({
            name: 'Second Hand Test',
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

    //  it('200 OK', async () => {
    //  const res = await request(app)
    //   .put('/api/v1/products/offer/1')
    //   .set('Authorization',`Bearer ${token}`)
    //   .send({
    //     status: true,
    //   });
    // expect(res.statusCode).toEqual(201)
    // expect(res.body.message).toEqual('Profil berhasil diperbarui')
    // })

    it('400 Bad Request', async () => {
        const res = await request(app)
            .put('/api/v1/products/offer/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });

    it('401 unauthoreized', async () => {
        const res = await request(app).put('/api/v1/products/offer/1').send({
            status: true,
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});
