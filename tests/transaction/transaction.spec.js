const { validationResult } = require('express-validator');
const { findByUser, update } = require('../../controllers/transaction');
const { Product, Transaction, Wishlist } = require('../../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ user, body, params } = {}) => ({ user, body, params });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const date = new Date();
const transaction = {
    id: 1,
    productId: 1,
    buyerId: 2,
    transactionDate: date,
    fixPrice: 100000,
    status: null,
    createdAt: date,
    updatedAt: date
};
const product = {
    id: 1,
    sellerId: 1,
    name: 'Product 1',
    price: 100000,
    publishDate: date,
    stock: 10,
    sold: 0,
    description: 'Product 1',
    status: true,
    createdAt: date,
    updatedAt: date
};
const wishlist = {
    id: 1,
    userId: 2,
    productId: 1,
    status: true,
    createdAt: date,
    updatedAt: date
};
const buyer = {
    id: 2,
    email: 'buyer@gmail.com',
    password: '12345678',
    createdAt: date,
    updatedAt: date
};
const transactionGet = { ...transaction, Product: { ...product } };
const transactionPut = {
    ...transaction,
    Product: { ...product, User: { ...buyer } }
};
jest.mock('express-validator');

describe('GET /api/v1/transactions', () => {
    beforeEach(() => {
        Transaction.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...transactionGet }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK (Seller)', async () => {
        const req = mockRequest({
            user: { id: 1, roleId: 2 }
        });
        const res = mockResponse();

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Transaksi ditemukan',
            data: [{ ...transactionGet }]
        });
    });
    test('200 OK (Buyer)', async () => {
        const req = mockRequest({
            user: { id: 2, roleId: 1 }
        });
        const res = mockResponse();

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Transaksi ditemukan',
            data: [{ ...transactionGet }]
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            user: { id: 2, roleId: 1 }
        });
        const res = mockResponse();

        Transaction.findAll = jest.fn().mockImplementation(() => []);

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Transaksi tidak ditemukan',
            data: null
        });
    });
});

describe('PUT /api/v1/transactions/:id', () => {
    beforeEach(() => {
        Transaction.findByPk = jest.fn().mockImplementation(() => ({
            ...transactionPut
        }));
        Product.update = jest.fn().mockImplementation(() => ({ ...product }));
        Wishlist.update = jest.fn().mockImplementation(() => ({ ...wishlist }));
        Transaction.update = jest
            .fn()
            .mockImplementation(() => ({ ...transaction }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({
            user: { id: 1, roleId: 2 },
            body: { status: true },
            params: { id: 1 }
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
            message: 'Transaksi diperbarui',
            data: { id: req.user.id, status: true }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            user: { id: 1, roleId: 2 },
            body: { status: 'test' },
            params: { id: 1 }
        });
        const res = mockResponse();
        const errors = [
            {
                value: 'test',
                msg: 'Status must be a boolean',
                param: 'status',
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
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('403 Forbidden', async () => {
        const req = mockRequest({
            user: { id: 2, roleId: 1 },
            body: { status: true },
            params: { id: 1 }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Anda tidak diperbolehkan untuk memperbarui transaksi ini',
            data: null
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            user: { id: 1, roleId: 2 },
            body: { status: true },
            params: { id: 1 }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Transaction.findByPk = jest.fn().mockImplementation(() => null);

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Transaksi tidak ditemukan',
            data: null
        });
    });
});
