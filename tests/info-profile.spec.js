const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { findbyID, update } = require('../controllers/profile');
const { User, Profile } = require('../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ body, params, file, query, originalUrl }) => ({body, params, file, query, originalUrl, get: jest.fn() });
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
    profilePicture: null,
    phoneNumber: null,
    cityId: null,
    address: null,
    createdAt: date,
    updatedAt: date
};

const profileInclude = {
    ...profile,
    User: user
}

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('express-validator');

describe('GET /api/v1/info-profile', () => {
    beforeEach(() => {
        jwt.sign.mockImplementation(() => 'token');
        User.findOne = jest.fn().mockImplementation(() => ({ ...user }));
        Profile.findByPk = jest.fn().mockImplementation(() => ({ ...profileInclude }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('201 Created', async () => {
        const req = mockRequest({ query: { id: 1 } });
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
                id: 1,
                userId: 1,
                name: 'John Doe',
                profilePicture: "undefined://undefined/images/profiles/null",
                phoneNumber: null,
                cityId: null,
                address: null,
                createdAt: date,
                updatedAt: date,
                User: user
            }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ query: { id: 'ID' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Id must be an integer',
                param: 'name',
                location: 'query'
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
});


describe('PUT /api/v1/info-profile', () => {
    beforeEach(() => {
        jwt.sign.mockImplementation(() => 'token');
        User.findOne = jest.fn().mockImplementation(() => ({ ...user }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('200 OK', async () => {
        const req = mockRequest({ body: { 
            id:1,
            userId: 1,
            name: 'John Doe Test',
            profilePicture: 'default.png',
            phoneNumber: "0825347236423",
            cityId: 1,
            address: "Jl Tamatan Binar No. 06, FE-BE4, Indonesia"
        }, query: { id: 1 } });

        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        // expect(res.json).toHaveBeenCalledWith({
        //     success: true,
        //     message: 'Update profile successful',
        //     data: {
        //         id: 1,
        //         profilePicture: 'a694e7bacd234beaaa7cea9a0bbdd4a4.png',
        //         userId: 1,
        //         phoneNumber: "0825347236423",
        //         cityId: 1
        //     },
        // });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            body: {
                userId: 1,
                name: 'John Doe Test',
                profilePicture: 'a694e7bacd234beaaa7cea9a0bbdd4a4.png',
                phoneNumber: "0825347236423",
                cityId: 'ID',
                address: "Jl Tamatan Binar No. 06, FE-BE4, Indonesia",
                updatedAt: date
            }, params: { id: 1 }
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'cityId must be an integer',
                param: 'cityId',
                location: 'body'
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
});