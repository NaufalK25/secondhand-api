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
        name: 'Product Offer Seller',
        email: 'productofferseller@gmail.com',
        password: '@ProductOfferSeller123'
    });
    const seller = await request(app).post('/api/v1/auth/login').send({
        email: 'productofferseller@gmail.com',
        password: '@ProductOfferSeller123'
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
    await request(app)
        .post('/api/v1/user/products')
        .set('Authorization', `Bearer ${sellerToken}`)
        .field('categories', [1, 2])
        .field('name', 'Barang bekas')
        .field('price', 1000000)
        .field('description', 'ini product bekas')
        .field('status', true)
        .attach('images', path.join(__dirname, '../../resources/product.jpg'));
    // buyer
    await request(app).post('/api/v1/auth/register').send({
        name: 'Product Offer Buyer',
        email: 'productofferbuyer@gmail.com',
        password: '@ProductOfferBuyer123'
    });
    const buyer = await request(app).post('/api/v1/auth/login').send({
        email: 'productofferbuyer@gmail.com',
        password: '@ProductOfferBuyer123'
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

describe('POST /api/v1/products/offers', () => {
    test('200 OK', async () => {
        const res = await request(app)
            .post('/api/v1/products/offers')
            .set('Authorization', `Bearer ${buyerToken}`)
            .send({ productId: 1, priceOffer: 10000 });

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Penawaran produk berhasil dibuat');
    });
    test('400 Bad Request', async () => {
        const res = await request(app)
            .post('/api/v1/products/offers')
            .set('Authorization', `Bearer ${buyerToken}`)
            .send({ productId: 1 });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    test('401 Unauthorized', async () => {
        const res = await request(app).post('/api/v1/products/offers').send({
            name: 'John Doe',
            phoneNumber: '081234567890',
            cityId: 1,
            address: 'Jl. Kebon Jeruk No. 1'
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
    test('403 Forbidden', async () => {
        const res = await request(app)
            .post('/api/v1/products/offers')
            .set('Authorization', `Bearer ${buyerToken}`)
            .send({ productId: 1, priceOffer: 10000 });
        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual('Anda sudah menawar produk ini');
    });
    test('404 Not Found', async () => {
        const res = await request(app)
            .post('/api/v1/products/offers')
            .set('Authorization', `Bearer ${buyerToken}`)
            .send({ productId: 10, priceOffer: 10000 });
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Produk tidak ditemukan');
    });
});

describe('GET /api/v1/products/offers', () => {
    test('200 OK (Buyer)', async () => {
        const res = await request(app)
            .get('/api/v1/products/offers')
            .set('Authorization', `Bearer ${buyerToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Penawaran produk ditemukan');
    });
    test('200 OK (Seller)', async () => {
        const res = await request(app)
            .get('/api/v1/products/offers')
            .set('Authorization', `Bearer ${sellerToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Penawaran produk ditemukan');
    });
    test('401 Unauthorized', async () => {
        const res = await request(app).get('/api/v1/products/offers');
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});

describe('GET /api/v1/products/offers/:id', () => {
    test('200 OK (Buyer)', async () => {
        const res = await request(app)
            .get('/api/v1/products/offer/1')
            .set('Authorization', `Bearer ${buyerToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Penawaran produk ditemukan');
    });
    test('200 OK (Seller)', async () => {
        const res = await request(app)
            .get('/api/v1/products/offer/1')
            .set('Authorization', `Bearer ${sellerToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Penawaran produk ditemukan');
    });
    test('400 Bad Request', async () => {
        const res = await request(app)
            .get('/api/v1/products/offer/b')
            .set('Authorization', `Bearer ${buyerToken}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    test('401 Unauthorized', async () => {
        const res = await request(app).get('/api/v1/products/offer/1');
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});

describe('PUT /api/v1/products/offers/:id', () => {
    test('200 OK', async () => {
        const res = await request(app)
            .put('/api/v1/products/offer/1')
            .set('Authorization', `Bearer ${sellerToken}`)
            .send({ status: true });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual(
            'Penawaran produk berhasil diperbarui'
        );
    });
    test('400 Bad Request', async () => {
        const res = await request(app)
            .put('/api/v1/products/offer/1')
            .set('Authorization', `Bearer ${sellerToken}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    test('401 Unatuhorized', async () => {
        const res = await request(app)
            .put('/api/v1/products/offer/1')
            .send({ status: true });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});
