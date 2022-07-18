const path = require('path');
const mustache = require('mustache');
const nodemailer = require('nodemailer');
const request = require('supertest');
const app = require('../../../app');
const { sequelize } = require('../../../models');
const { uploadImage } = require('../../../utils/cloudinary');

process.env.NODE_ENV = 'test';
let buyerToken, sellerToken;
const { queryInterface } = sequelize;

jest.mock('mustache');
jest.mock('nodemailer');
jest.mock('../../../utils/cloudinary');

beforeAll(async () => {
    nodemailer.createTransport.mockImplementation(() => ({
        sendMail: jest.fn().mockImplementation(() => Promise.resolve())
    }));
    mustache.render.mockImplementation(() => 'welcome_mail');
    uploadImage.mockImplementation(() => ({
        secure_url:
            'https://res.cloudinary.com/dko04cygp/image/upload/v1656665571/tests/products/1/1-1.jpg'
    }));
    // seller
    await request(app).post('/api/v1/auth/register').send({
        name: 'Product',
        email: 'product@gmail.com',
        password: '@Product123'
    });
    const seller = await request(app).post('/api/v1/auth/login').send({
        email: 'product@gmail.com',
        password: '@Product123'
    });
    sellerToken = seller.res.rawHeaders[7].slice(6).replace('; Path=/', '');
    await request(app)
        .put('/api/v1/user/profile')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
            phoneNumber: '08123456789',
            cityId: 1,
            address: 'Jl Kebon Jeruk'
        });
    await request(app).post('/api/v1/auth/register').send({
        name: 'Product Buyer',
        email: 'productbuyer@gmail.com',
        password: '@ProductBuyer123'
    });
    // buyer
    const buyer = await request(app).post('/api/v1/auth/login').send({
        email: 'productbuyer@gmail.com',
        password: '@ProductBuyer123'
    });
    buyerToken = buyer.res.rawHeaders[7].slice(6).replace('; Path=/', '');
});
afterAll(async () => {
    jest.clearAllMocks();
    await queryInterface.bulkDelete('Notifications', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Products', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('ProductOffers', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('ProductResources', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Profiles', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Transactions', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('TransactionHistories', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Wishlists', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('ProductCategoryThroughs', null, {
        truncate: true,
        restartIdentity: true
    });
});

describe('POST /api/v1/user/products', () => {
    test('201 Created', async () => {
        const res = await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toEqual('Produk berhasil dibuat');
    });
    test('201 Created (categories string)', async () => {
        const res = await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', '1,2')
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toEqual('Produk berhasil dibuat');
    });
    test('400 Bad Request', async () => {
        const res = await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', '')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    test('401 Unauthorized', async () => {
        const res = await request(app).post('/api/v1/user/products');
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
    test('403 Forbidden', async () => {
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        const res = await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toEqual('Anda hanya bisa memposting 4 produk');
    });
});

describe('GET /api/v1/products', () => {
    test('200 OK', async () => {
        const res = await request(app).get('/api/v1/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Produk ditemukan');
    });
    test('404 Not Found', async () => {
        await queryInterface.bulkDelete('Notifications', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('Products', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductResources', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductCategoryThroughs', null, {
            truncate: true,
            restartIdentity: true
        });
        const res = await request(app).get('/api/v1/products');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual('Produk tidak ditemukan');
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [2, 3])
            .field('name', 'Barang bekas 2')
            .field('price', 2000000)
            .field('description', 'ini product bekas 2')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
    });
});

describe('GET /api/v1/products/:id', () => {
    test('200 OK', async () => {
        const res = await request(app).get('/api/v1/products/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Produk ditemukan');
    });
    test('400 Bad Request', async () => {
        const res = await request(app).get('/api/v1/products/a');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    test('404 Not Found', async () => {
        await queryInterface.bulkDelete('Notifications', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('Products', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductResources', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductCategoryThroughs', null, {
            truncate: true,
            restartIdentity: true
        });
        const res = await request(app).get('/api/v1/products/1');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual('Produk tidak ditemukan');
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [2, 3])
            .field('name', 'Barang bekas 2')
            .field('price', 2000000)
            .field('description', 'ini product bekas 2')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
    });
});

describe('GET /api/v1/products/search', () => {
    test('200 OK', async () => {
        const res = await request(app).get(
            '/api/v1/products/search?keyword=bekas'
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Produk ditemukan');
    });
    test('400 Bad Request', async () => {
        const res = await request(app).get('/api/v1/products/search?keyword=');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    test('404 Not Found', async () => {
        await queryInterface.bulkDelete('Notifications', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('Products', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductResources', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductCategoryThroughs', null, {
            truncate: true,
            restartIdentity: true
        });
        const res = await request(app).get(
            '/api/v1/products/search?keyword=bekas'
        );
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual('Produk tidak ditemukan');
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [2, 3])
            .field('name', 'Barang bekas 2')
            .field('price', 2000000)
            .field('description', 'ini product bekas 2')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
    });
});

describe('GET /api/v1/products/filter', () => {
    test('200 OK', async () => {
        const res = await request(app).get(
            '/api/v1/products/filter?category=hobi'
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Produk ditemukan');
    });
    test('400 Bad Request', async () => {
        const res = await request(app).get('/api/v1/products/filter?category=');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    test('404 Not Found', async () => {
        await queryInterface.bulkDelete('Notifications', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('Products', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductResources', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductCategoryThroughs', null, {
            truncate: true,
            restartIdentity: true
        });
        const res = await request(app).get(
            '/api/v1/products/filter?category=hobi'
        );
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual('Produk tidak ditemukan');
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [2, 3])
            .field('name', 'Barang bekas 2')
            .field('price', 2000000)
            .field('description', 'ini product bekas 2')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
    });
});

describe('GET /api/v1/user/products', () => {
    test('200 OK', async () => {
        const res = await request(app)
            .get('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Produk ditemukan');
    });
    test('200 OK (sold)', async () => {
        await request(app)
            .post('/api/v1/products/offers')
            .set('Authorization', `Bearer ${buyerToken}`)
            .send({ productId: 1, priceOffer: 10000 });
        await request(app)
            .put('/api/v1/products/offer/1')
            .set('Authorization', `Bearer ${sellerToken}`)
            .send({ status: true });
        await request(app)
            .put('/api/v1/transactions/1')
            .set('Authorization', `Bearer ${sellerToken}`)
            .send({ status: true });
        const res = await request(app)
            .get('/api/v1/user/products?sortBy=sold')
            .set('Authorization', `Bearer ${sellerToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Produk ditemukan');
    });
    test('200 OK (wishlist)', async () => {
        await request(app)
            .post('/api/v1/products/offers')
            .set('Authorization', `Bearer ${buyerToken}`)
            .send({ productId: 2, priceOffer: 10000 });
        const res = await request(app)
            .get('/api/v1/user/products?sortBy=wishlist')
            .set('Authorization', `Bearer ${sellerToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Produk ditemukan');
    });
    test('401 Unauthorized', async () => {
        const res = await request(app).get('/api/v1/user/products');
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
    test('404 Not Found', async () => {
        await queryInterface.bulkDelete('Notifications', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('Products', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductOffers', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductResources', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('Transactions', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('TransactionHistories', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('Wishlists', null, {
            truncate: true,
            restartIdentity: true
        });
        await queryInterface.bulkDelete('ProductCategoryThroughs', null, {
            truncate: true,
            restartIdentity: true
        });
        const res = await request(app)
            .get('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual('Produk tidak ditemukan');
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
        await request(app)
            .post('/api/v1/user/products')
            .set('Authorization', `Bearer ${sellerToken}`)
            .field('categories', [1, 2])
            .field('name', 'Barang bekas')
            .field('price', 1000000)
            .field('description', 'ini product bekas')
            .field('status', true)
            .attach(
                'images',
                path.join(__dirname, '../../resources/product.jpg')
            );
    });
});