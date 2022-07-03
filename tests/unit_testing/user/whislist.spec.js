const { validationResult } = require('express-validator');
const { create, destroy, findByUser } = require('../../../controllers/wishlist');
const { Product, User, Wishlist } = require('../../../models');

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
    name: 'Product',
    price: 100,
    publishDate: date,
    description: 'Product description',
    status: true,
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
            message: 'Daftar keinginan ditemukan',
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
            message: 'Daftar keinginan tidak ditemukan',
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
            message: 'Daftar keinginan berhasil ditambah',
            data: { ...wishlist }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ user: { id: 1 }, body: { productId: '' } });
        const res = mockResponse();
        const errors = [
            {
                valuue: '',
                msg: 'Id produk harus diisi',
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
            message: 'Kesalahan validasi',
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
            message: 'Pengguna tidak ditemukan',
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
            message: 'Produk tidak ditemukan',
            data: null
        });
    });
});

describe('DELETE /api/v1/user/wishlist/:id', () => {
    beforeEach(() => {
        User.findByPk = jest.fn().mockImplementation(() => ({ ...user }));
        Product.findByPk = jest.fn().mockImplementation(() => ({ ...product }));
        Wishlist.findByPk = jest.fn().mockImplementation(() => ({ ...wishlist }));
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
            message: 'Daftar keinginan berhasil dihapus',
            data: { ...wishlist }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ user: { id: 1 }, params: { id: 'abc' } });
        const res = mockResponse();
        const errors = [
            {
                valuue: '',
                msg: 'Id harus berupa angka',
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
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('403 Forbidden', async () => {
        const req = mockRequest({ user: { id: 2 }, params: { id: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await destroy(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Anda tidak diperbolehkan untuk menghapus daftar keinginan ini',
            data: null
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
            message: 'Daftar keinginan tidak ditemukan',
            data: null
        });
    });
});
