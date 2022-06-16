const fs = require('fs/promises');
const { validationResult } = require('express-validator');
const { findbyID, update } = require('../controllers/profile');
const { User, Profile } = require('../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ body, params, file, protocol, path } = {}) => ({
    body,
    params,
    file,
    protocol,
    path,
    get: jest.fn().mockImplementation(header => {
        if (header === 'host') return 'localhost:8000';
    })
});
const mockResponse = () => {
    const res = {};
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
    profilePicture: 'profilePicture.jpg',
    phoneNumber: '081234567890',
    cityId: 1,
    address: 'Jl. Kebon Jeruk No. 1',
    createdAt: date,
    updatedAt: date
};

const profileInclude = {
    ...profile,
    User: { ...user }
};

jest.mock('fs/promises');
jest.mock('express-validator');

describe('GET /api/v1/user/profile', () => {
    beforeEach(() => {
        Profile.findByPk = jest
            .fn()
            .mockImplementation(() => ({ ...profileInclude }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('200 OK', async () => {
        const req = mockRequest({ params: { id: 1 }, protocol: 'http' });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findbyID(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Profile found',
            data: {
                ...profileInclude,
                profilePicture: `${req.protocol}://${req.get(
                    'host'
                )}/images/profiles/profilePicture.jpg`
            }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ params: { id: '' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Id must be an integer',
                param: 'id',
                location: 'params'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await findbyID(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Validation error',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            params: { id: 1 },
            protocol: 'http',
            path: '/api/v1/user/profile'
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Profile.findByPk = jest.fn().mockImplementation(() => null);

        await findbyID(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: `Endpoint ${req.path} not found`,
            data: null
        });
    });
});

describe('PUT /api/v1/user/profile', () => {
    beforeEach(() => {
        fs.unlink.mockImplementation(() => Promise.resolve());
        Profile.findByPk = jest
            .fn()
            .mockImplementation(() => ({ ...profileInclude }));
        Profile.update = jest.fn().mockImplementation(() => ({ ...profile }));
        User.update = jest.fn().mockImplementation(() => ({ ...user }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('200 OK', async () => {
        const req = mockRequest({
            body: {
                userId: 1,
                name: 'John Doe',
                phoneNumber: '081234567890',
                cityId: 1,
                address: 'Jl. Kebon Jeruk No. 1'
            },
            params: { id: 1 },
            file: { filename: 'profilePicture.jpg' }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Update profile successful',
            data: {
                id: req.params.id,
                ...req.body,
                profilePicture: 'profilePicture.jpg'
            }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            params: { id: '' }
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Id must be an integer',
                param: 'Id',
                location: 'params'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Validation error',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            params: { id: 1 },
            protocol: 'http',
            path: '/api/v1/user/profile'
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Profile.findByPk = jest.fn().mockImplementation(() => null);

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: `Endpoint ${req.path} not found`,
            data: null
        });
    });
});
