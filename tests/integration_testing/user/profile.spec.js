const path = require('path');
const mustache = require('mustache');
const nodemailer = require('nodemailer');
const request = require('supertest');
const app = require('../../../app');
const { sequelize } = require('../../../models');
const { uploadImage } = require('../../../utils/cloudinary');

process.env.NODE_ENV = 'test';
let token;
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
            'https://res.cloudinary.com/dko04cygp/image/upload/v1656665571/tests/profiles/1.png'
    }));
    await request(app).post('/api/v1/auth/register').send({
        name: 'Profile',
        email: 'profile@gmail.com',
        password: '@Profile123'
    });
    const login = await request(app).post('/api/v1/auth/login').send({
        email: 'profile@gmail.com',
        password: '@Profile123'
    });
    token = login.res.rawHeaders[7].slice(6).replace('; Path=/', '');
});
afterAll(async () => {
    jest.clearAllMocks();
    await request(app)
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${token}`);

    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Profiles', null, {
        truncate: true,
        restartIdentity: true
    });
});

describe('GET /api/v1/user/profile', () => {
    test('200 OK', async () => {
        const res = await request(app)
            .get('/api/v1/user/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Profil ditemukan');
    });
    test('401 unauthoreized', async () => {
        const res = await request(app).get('/api/v1/user/profile');
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});

describe('PUT /api/v1/user/profile', () => {
    test('200 OK', async () => {
        const res = await request(app)
            .put('/api/v1/user/profile')
            .set('Authorization', `Bearer ${token}`)
            .field('phoneNumber', '0812345678')
            .field('cityId', 1)
            .field('address', 'Jl. Kebon Jeruk No. 1')
            .attach(
                'profilePicture',
                path.join(__dirname, '../../resources/profile.jpg')
            );
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Profil berhasil diperbarui');
    });
    test('400 Bad Request', async () => {
        const res = await request(app)
            .put('/api/v1/user/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                phoneNumber: '',
                cityId: 1,
                address: 'Jl. Kebon Jeruk No. 1'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Kesalahan validasi');
    });
    test('401 Unauthorized', async () => {
        const res = await request(app).put('/api/v1/user/profile').send({
            name: 'John Doe',
            phoneNumber: '081234567890',
            cityId: 1,
            address: 'Jl. Kebon Jeruk No. 1'
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Tidak memiliki token');
    });
});
