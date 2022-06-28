const fs = require('fs/promises');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mustache = require('mustache');
const nodemailer = require('nodemailer');
const { v4 } = require('uuid');
const { validationResult } = require('express-validator');
const {
    forgotPassword,
    login,
    logout,
    register,
    resetPassword
} = require('../../controllers/auth');
const { Profile, User } = require('../../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ body, protocol } = {}) => ({
    body,
    protocol,
    get: jest.fn().mockImplementation(header => {
        if (header === 'host') return 'localhost:8000';
    })
});
const mockResponse = () => {
    const res = {};
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const date = new Date();
const user = {
    id: 1,
    email: 'johndoe@gmail.com',
    password: '12345678',
    createdAt: date,
    updatedAt: date
};
const profile = {
    id: 1,
    userId: 1,
    name: 'John Doe',
    profilePicture: null,
    phoneNumber: null,
    cityId: null,
    address: null,
    createdAt: date,
    updatedAt: date
};

jest.mock('fs/promises');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('mustache');
jest.mock('nodemailer');
jest.mock('express-validator');
jest.mock('uuid');

describe('POST /api/v1/auth/login', () => {
    beforeEach(() => {
        jwt.sign.mockImplementation(() => 'token');
        User.findOne = jest.fn().mockImplementation(() => ({ ...user }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({
            body: { email: 'johndoe@gmail.com', password: '12345678' }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await login(req, res);

        expect(res.cookie).toHaveBeenCalledWith('token', 'token');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Berhasil masuk',
            data: null
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ body: { email: '', password: '12345678' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Email harus diisi',
                param: 'email',
                location: 'body'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            body: { email: 'johndoe@gmail.com', password: '12345678' }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        User.findOne = jest.fn().mockImplementation(() => null);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Pengguna tidak ditemukan',
            data: null
        });
    });
});

describe('POST /api/v1/auth/logout', () => {
    test('200 OK', () => {
        const req = mockRequest();
        const res = mockResponse();

        logout(req, res);

        expect(res.clearCookie).toHaveBeenCalledWith('token');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Berhasil keluar',
            data: null
        });
    });
});

describe('POST /api/v1/auth/register', () => {
    beforeEach(() => {
        fs.readFile.mockImplementation(() => 'welcome_mail');
        mustache.render.mockImplementation(() => 'welcome_mail');
        nodemailer.createTransport.mockImplementation(() => ({
            sendMail: jest.fn().mockImplementation(() => Promise.resolve())
        }));
        bcryptjs.hash.mockImplementation(() => 'hashedPassword');
        User.create = jest.fn().mockImplementation(() => ({ ...user }));
        Profile.create = jest.fn().mockImplementation(() => ({ ...profile }));
    });
    afterEach(() => jest.clearAllMocks());
    test('201 Created', async () => {
        const req = mockRequest({
            body: {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '12345678'
            }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Berhasil registrasi',
            data: null
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            body: { name: '', email: 'johndoe@gmail.com', password: '12345678' }
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Nama harus diisi',
                param: 'name',
                location: 'body'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
});

describe('POST/ api/v1/auth/forgot-password', () => {
    beforeEach(() => {
        fs.readFile.mockImplementation(() => 'forgot_password');
        mustache.render.mockImplementation(() => 'forgot_password');
        nodemailer.createTransport.mockImplementation(() => ({
            sendMail: jest.fn().mockImplementation(() => Promise.resolve())
        }));
        v4.mockImplementation(() => 'token');
        User.findOne = jest.fn().mockImplementation(() => ({ ...user }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({
            body: { email: 'johndoe@gmail.com' },
            protocol: 'http'
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await forgotPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Email berhasil dikirim',
            data: null
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ body: { email: '' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Email harus diisi',
                param: 'email',
                location: 'body'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await forgotPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            body: { email: 'johndoe@gmail.com' },
            protocol: 'http'
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        User.findOne = jest.fn().mockImplementation(() => null);

        await forgotPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Pengguna tidak ditemukan',
            data: null
        });
    });
});

describe('POST/ api/v1/auth/reset-password', () => {
    beforeEach(() => {
        bcryptjs.hash.mockImplementation(() => 'hashedPassword');
        User.findOne = jest.fn().mockImplementation(() => ({ ...user }));
        User.update = jest.fn().mockImplementation(() => ({ ...user }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({
            body: {
                email: 'johndoe@gmail.com',
                token: 'token',
                password: '12345678'
            }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Password berhasil direset',
            data: null
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            body: { email: 'johndoe@gmail.com', token: 'token', password: '' }
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Password harus diisi',
                param: 'password',
                location: 'body'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('403 Forbidden', async () => {
        const req = mockRequest({
            body: {
                email: 'johndoe@gmail.com',
                token: 'token2',
                password: '12345678'
            }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Token tidak valid',
            data: null
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            body: {
                email: 'johndoe@gmail.com',
                token: 'token',
                password: '12345678'
            }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        User.findOne = jest.fn().mockImplementation(() => null);

        await resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Pengguna tidak ditemukan',
            data: null
        });
    });
});
