const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { login, logout, register } = require('../controllers/auth');
const { User, Profile } = require('../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ body } = {}) => ({ body });
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

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('express-validator');

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

        expect(res.cookie).toHaveBeenCalledWith('token', 'token', {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Login successful',
            data: { ...user }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ body: { email: '', password: '12345678' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Email is required',
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
            message: 'Validation error',
            data: errors
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
            message: 'Logout successful',
            data: null
        });
    });
});

describe('POST /api/v1/auth/register', () => {
    beforeEach(() => {
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
            message: 'Registration successful',
            data: { user, profile }
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
                msg: 'Name is required',
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
            message: 'Validation error',
            data: errors
        });
    });
});
