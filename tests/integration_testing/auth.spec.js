const mustache = require('mustache');
const nodemailer = require('nodemailer');
const request = require('supertest');
const { v4 } = require('uuid');
const app = require('../../app');
const { User, sequelize } = require('../../models');

process.env.NODE_ENV = 'test';
const { queryInterface } = sequelize;

jest.mock('uuid');
jest.mock('mustache');
jest.mock('nodemailer');

beforeAll(() => {
    nodemailer.createTransport.mockImplementation(() => ({
        sendMail: jest.fn().mockImplementation(() => Promise.resolve())
    }));
    mustache.render.mockImplementation(() => 'welcome_mail');
});
afterAll(async () => {
    jest.clearAllMocks();
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Profiles', null, {
        truncate: true,
        restartIdentity: true
    });
});

describe('POST /api/v1/auth/register', () => {
    test('201 Created', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            name: 'Register',
            email: 'register@gmail.com',
            password: '@Register123'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Berhasil registrasi');
    });
    test('400 Bad Request', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            name: 'Register',
            email: '',
            password: '@Register123'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Kesalahan validasi');
    });
    test('403 Forbidden', async () => {
        await request(app).post('/api/v1/auth/register').send({
            name: 'Register2',
            email: 'register2@gmail.com',
            password: '@Register123'
        });
        const login = await request(app).post('/api/v1/auth/login').send({
            email: 'register2@gmail.com',
            password: '@Register123'
        });
        const token = login.res.rawHeaders[7].slice(6).replace('; Path=/', '');
        const res = await request(app)
            .post('/api/v1/auth/register')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Register3',
                email: 'register3@gmail.com',
                password: '@Register123'
            });
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('Dilarang');
        await request(app)
            .post('/api/v1/auth/logout')
            .set('Authorization', `Bearer ${token}`);
    });
});

describe('POST /api/v1/auth/login', () => {
    beforeAll(async () => {
        await request(app).post('/api/v1/auth/register').send({
            name: 'Login',
            email: 'login@gmail.com',
            password: '@Login123'
        });
    });
    test('200 OK', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'login@gmail.com',
            password: '@Login123'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Berhasil masuk');
        await request(app)
            .post('/api/v1/auth/logout')
            .set(
                'Authorization',
                `Bearer ${res.res.rawHeaders[7]
                    .slice(6)
                    .replace('; Path=/', '')}`
            );
    });
    test('400 Bad Request', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: '',
            password: '@Login123'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Kesalahan validasi');
    });
    test('403 Forbidden', async () => {
        const login = await request(app).post('/api/v1/auth/login').send({
            email: 'login@gmail.com',
            password: '@Login123'
        });
        const token = login.res.rawHeaders[7].slice(6).replace('; Path=/', '');
        const res = await request(app)
            .post('/api/v1/auth/login')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'login2@gmail.com',
                password: '@Login123'
            });
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('Dilarang');
        await request(app)
            .post('/api/v1/auth/logout')
            .set('Authorization', `Bearer ${token}`);
    });
});

describe('POST /api/v1/auth/logout', () => {
    beforeAll(async () => {
        await request(app).post('/api/v1/auth/register').send({
            name: 'Logout',
            email: 'logout@gmail.com',
            password: '@Logout123'
        });
    });
    test('200 OK', async () => {
        const login = await request(app).post('/api/v1/auth/login').send({
            email: 'logout@gmail.com',
            password: '@Logout123'
        });
        const token = login.res.rawHeaders[7].slice(6).replace('; Path=/', '');
        const res = await request(app)
            .post('/api/v1/auth/logout')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Berhasil keluar');
    });
    test('403 Forbidden', async () => {
        const res = await request(app).post('/api/v1/auth/logout');
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('Dilarang');
    });
});

describe('POST /api/v1/auth/forgot-password', () => {
    let token;
    beforeAll(async () => {
        v4.mockImplementation(() => 'token');
        await request(app).post('/api/v1/auth/register').send({
            name: 'Forgot Password',
            email: 'forgotpassword@gmail.com',
            password: '@ForgotPassword123'
        });
        const login = await request(app).post('/api/v1/auth/login').send({
            email: 'forgotpassword@gmail.com',
            password: '@ForgotPassword123'
        });
        token = login.res.rawHeaders[7].slice(6).replace('; Path=/', '');
    });
    test('200 OK', async () => {
        const res = await request(app)
            .post('/api/v1/auth/forgot-password')
            .send({ email: 'forgotpassword@gmail.com' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Email berhasil dikirim');
    });
    test('400 Bad Request', async () => {
        const res = await request(app)
            .post('/api/v1/auth/forgot-password')
            .send({ email: '' });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Kesalahan validasi');
    });
    test('403 Forbidden', async () => {
        const res = await request(app)
            .post('/api/v1/auth/forgot-password')
            .send({ email: 'forgotpassword@gmail.com' })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('Dilarang');
    });
});

describe('POST /api/v1/auth/reset-password', () => {
    let token;
    beforeAll(async () => {
        v4.mockImplementation(() => 'token');
        await request(app).post('/api/v1/auth/register').send({
            name: 'Reset Password',
            email: 'resetpassword@gmail.com',
            password: '@ResetPassword123'
        });
        const login = await request(app).post('/api/v1/auth/login').send({
            email: 'resetpassword@gmail.com',
            password: '@ResetPassword123'
        });
        token = login.res.rawHeaders[7].slice(6).replace('; Path=/', '');
        await request(app)
            .post('/api/v1/auth/forgot-password')
            .send({ email: 'resetpassword@gmail.com' });
    });
    test('200 OK', async () => {
        const res = await request(app)
            .post('/api/v1/auth/reset-password')
            .send({
                email: 'resetpassword@gmail.com',
                token: 'token',
                password: '@ResetPassword123'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Password berhasil direset');
    });
    test('400 Bad Request', async () => {
        const res = await request(app)
            .post('/api/v1/auth/reset-password')
            .send({
                email: '',
                token: 'token',
                password: '@ResetPassword123'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Kesalahan validasi');
    });
    test('403 Forbidden', async () => {
        const res = await request(app)
            .post('/api/v1/auth/reset-password')
            .send({
                email: 'resetpassword@gmail.com',
                token: 'token',
                password: '@ResetPassword123'
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('Dilarang');
    });
    test('403 Forbidden (Invalid Token)', async () => {
        const res = await request(app)
            .post('/api/v1/auth/reset-password')
            .send({
                email: 'resetpassword@gmail.com',
                token: 'token2',
                password: '@ResetPassword123'
            });
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('Token tidak valid');
    });
});
