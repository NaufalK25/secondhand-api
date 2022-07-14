const { validationResult } = require('express-validator');
const {
    findByUser,
    update,
    findById
} = require('../../../controllers/transaction');
const {
    Product,
    Transaction,
    TransactionHistory,
    Wishlist
} = require('../../../models');

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
const profile = {
    id: 1,
    userId: 1,
    name: 'John Doe',
    profilePicture:
        'https://res.cloudinary.com/dko04cygp/image/upload/v1656654290/profiles/default.png',
    phoneNumber: '081234567890',
    cityId: 1,
    address: 'Jl. Kebon Jeruk No. 1',
    createdAt: date,
    updatedAt: date
};
const city = {
    id: 1,
    city: 'Kota Surabaya',
    createdAt: date,
    updatedAt: date
};
const transaction = {
    id: 1,
    productOfferId: 1,
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
    description: 'Product 1',
    status: true,
    createdAt: date,
    updatedAt: date
};
const productResource = {
    id: 1,
    productId: 1,
    filename:
        'https://res.cloudinary.com/dko04cygp/image/upload/v1656654290/products/1/1-1.jpg',
    createdAt: date,
    updatedAt: date
};
const productOffer = {
    id: 1,
    productId: 1,
    buyerId: 1,
    priceOffer: 100,
    status: null,
    createdAt: date,
    updatedAt: date
};
const transactionhistory = {
    id: 1,
    userId: 1,
    transactionId: 1,
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
const transactionGet = {
    ...transaction,
    User: { ...user, Profile: { ...profile, City: { ...city } } },
    ProductOffer: {
        ...productOffer,
        Product: { ...product, ProductResources: [{ ...productResource }] }
    }
};
const transactionPut = {
    ...transaction,
    ProductOffer: { ...productOffer, Product: { ...product } }
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

describe('GET /api/v1/transactions/:id', () => {
    beforeEach(() => {
        Transaction.findOne = jest
            .fn()
            .mockImplementation(() => [{ ...transactionGet }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK (Seller)', async () => {
        const req = mockRequest({
            user: { id: 1, roleId: 2 },
            params: { id: 1 }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Transaction.findOne = jest
            .fn()
            .mockImplementation(() => ({ ...transactionGet }));

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Transaksi ditemukan',
            data: { ...transactionGet }
        });
    });
    test('200 OK (Buyer)', async () => {
        const req = mockRequest({
            user: { id: 2, roleId: 1 },
            params: { id: 1 }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Transaksi ditemukan',
            data: [{ ...transactionGet }]
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            user: { id: 2, roleId: 1 },
            params: { id: '' }
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Id harus berupa angka',
                param: 'id',
                location: 'params'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            user: { id: 2, roleId: 1 },
            params: { id: 10 }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Transaction.findByPk = jest.fn().mockImplementation(() => null);

        await findById(req, res);

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
        Wishlist.destroy = jest
            .fn()
            .mockImplementation(() => ({ ...wishlist }));
        Transaction.update = jest
            .fn()
            .mockImplementation(() => ({ ...transaction }));
        TransactionHistory.create = jest
            .fn()
            .mockImplementation(() => ({ ...transactionhistory }));
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
            message: 'Transaksi berhasil diperbarui',
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
                msg: 'Status harus berupa nilai benar atau salah',
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
