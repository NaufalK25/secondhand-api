const { validationResult } = require('express-validator');
const {
    create,
    findByUser,
    update
} = require('../../controllers/productoffer');
const {
    Product,
    ProductOffer,
    Transaction,
    TransactionHistory
} = require('../../models');

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
    status: true,
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
const transaction = {
    id: 1,
    productId: 1,
    buyerId: 1,
    transactionDate: date,
    fixPrice: 100,
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
const productOfferIncludeProductIncludeUser = {
    ...productOffer,
    Product: { ...product, User: { ...user } }
};

jest.mock('express-validator');

describe('GET /api/v1/products/offers', () => {
    beforeEach(() => {
        ProductOffer.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productOffer }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK (Seller)', async () => {
        const req = mockRequest({ user: { id: 1, roleId: 2 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        ProductOffer.findALl = jest
            .fn()
            .mockImplementation(() => [{ ...productOffer }]);

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'ProductOffer found',
            data: [{ ...productOffer }]
        });
    });
    test('200 OK (Buyer)', async () => {
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
            message: 'ProductOffer found',
            data: [{ ...productOffer }]
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({ user: { id: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        ProductOffer.findAll = jest.fn().mockImplementation(() => []);

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'ProductOffer not found',
            data: null
        });
    });
});

describe('POST /api/v1/products/offers', () => {
    beforeEach(() => {
        Product.findByPk = jest.fn().mockImplementation(() => ({ ...product }));
        ProductOffer.create = jest
            .fn()
            .mockImplementation(() => ({ ...productOffer }));
    });
    afterEach(() => jest.clearAllMocks());
    test('201 Created', async () => {
        const req = mockRequest({
            user: { id: 1 },
            body: { productId: 1, priceOffer: 100 }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'ProductOffer created',
            data: { ...productOffer }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            user: { id: 1 },
            body: { productId: '', priceOffer: 100 }
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
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
    test('404 Not Found', async () => {
        const req = mockRequest({
            user: { id: 1 },
            body: { productId: 1, priceOffer: 100 }
        });
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

describe('PUT /api/v1/products/offer/:id', () => {
    beforeEach(() => {
        ProductOffer.findByPk = jest.fn().mockImplementation(() => ({
            ...productOfferIncludeProductIncludeUser
        }));
        ProductOffer.update = jest
            .fn()
            .mockImplementation(() => ({ status: null }));
        Transaction.create = jest
            .fn()
            .mockImplementation(() => ({ ...transaction }));
        TransactionHistory.create = jest
            .fn()
            .mockImplementation(() => ({ ...transactionhistory }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK (Pending)', async () => {
        const req = mockRequest({
            user: { id: 1 },
            params: { id: 1 },
            body: {}
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
            message: 'ProductOffer updated',
            data: { id: 1, status: null }
        });
    });
    test('200 OK (Accepted)', async () => {
        const req = mockRequest({
            user: { id: 1 },
            params: { id: 1 },
            body: { status: true }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        ProductOffer.update = jest
            .fn()
            .mockImplementation(() => ({ status: true }));

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'ProductOffer updated',
            data: { id: 1, status: true }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            user: { id: 1 },
            params: { id: 1 },
            body: { status: 'test' }
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
            message: 'Validation error',
            data: errors
        });
    });
    test('403 Forbidden', async () => {
        const req = mockRequest({
            user: { id: 2 },
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
            message: 'You are not allowed to update this product offer',
            data: null
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            user: { id: 1 },
            params: { id: 1 },
            body: { status: null }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        ProductOffer.findByPk = jest.fn().mockImplementation(() => null);

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'ProductOffer not found',
            data: null
        });
    });
});
