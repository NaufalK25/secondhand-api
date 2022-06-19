const { validationResult } = require('express-validator');
const { create, destroy, findByUser } = require('../../controllers/wishlist');
const { Product, User, Wishlist } = require('../../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ user, body, params } = {}) => ({ user, body, params });
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
const product = {
    id: 1,
    sellerId: 1,
    categoryId: 1,
    name: 'Product',
    price: 100,
    publishDate: date,
    stock: 10,
    sold: 0,
    description: 'Product description',
    status: 'available',
    createdAt: date,
    updatedAt: date
};
const wishlist = {
    id: 1,
    userId: 1,
    productId: 1,
    createdAt: date,
    updatedAt: date
};

jest.mock('express-validator');

describe('GET /api/v1/user/wishlists', () => {
    beforeEach(() => {
        Wishlist.findAll = jest
            .fn()
            .mockImplementation(() => ({ ...wishlist }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Wishlist found',
            data: { ...wishlist }
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({ user: { id: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Wishlist.findAll = jest.fn().mockImplementation(() => []);

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Wishlist not found',
            data: null
        });
    });
});

describe('POST /api/v1/user/wishlists', () => {
    beforeEach(() => {
        User.findByPk = jest.fn().mockImplementation(() => ({ ...user }));
        Product.findByPk = jest.fn().mockImplementation(() => ({ ...product }));
        Wishlist.create = jest.fn().mockImplementation(() => ({ ...wishlist }));
    });
    afterEach(() => jest.clearAllMocks());
    test('201 Created', async () => {
        const req = mockRequest({ user: { id: 1 }, body: { productId: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Wishlist created',
            data: { ...wishlist }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ user: { id: 1 }, body: { productId: '' } });
        const res = mockResponse();
        const errors = [
            {
                valuue: '',
                msg: 'Product id is required',
                param: 'productId',
                location: 'body'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Validation error',
            data: errors
        });
    });
    test('404 Not Found (User)', async () => {
        const req = mockRequest({ user: { id: 1 }, body: { productId: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        User.findByPk = jest.fn().mockImplementation(() => null);

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'User not found',
            data: null
        });
    });
    test('404 Not Found (Product)', async () => {
        const req = mockRequest({ user: { id: 1 }, body: { productId: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Product.findByPk = jest.fn().mockImplementation(() => null);

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Product not found',
            data: null
        });
    });
});

describe('DELETE /api/v1/user/wishlist/:id', () => {
    beforeEach(() => {
        User.findByPk = jest.fn().mockImplementation(() => ({ ...user }));
        Product.findByPk = jest.fn().mockImplementation(() => ({ ...product }));
        Wishlist.create = jest.fn().mockImplementation(() => ({ ...wishlist }));
        Wishlist.destroy = jest
            .fn()
            .mockImplementation(() => ({ ...wishlist }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 }, params: { id: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await destroy(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Wishlist deleted',
            data: { ...wishlist }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ user: { id: 1 }, params: { id: 'abc' } });
        const res = mockResponse();
        const errors = [
            {
                valuue: '',
                msg: 'Id must be an integer',
                param: 'id',
                location: 'params'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await destroy(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Validation error',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({ user: { id: 1 }, params: { id: 3 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Wishlist.findByPk = jest.fn().mockImplementation(() => null);

        await destroy(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Wishlist not found',
            data: null
        });
    });
});
