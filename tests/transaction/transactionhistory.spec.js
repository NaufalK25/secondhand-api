const { validationResult } = require('express-validator');
const {
    findByUser,
    findById
} = require('../../controllers/transactionhistory');
const { Product, TransactionHistory, User } = require('../../models');

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
const seller = {
    id: 1,
    email: 'seller@gmail.com',
    roleId: 2,
    password: '12345678',
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
const userIncludeTransactions = { ...seller, Transaction: { ...transaction } };
const transactionIncludeProduct = { ...transaction, Product: { ...product } };
const transactionIncludeProductIncludeUser = {
    ...transaction,
    Product: { ...product, User: { ...buyer } }
};
jest.mock('express-validator');

describe('GET /api/v1/transactions/history', () => {
    beforeEach(() => {
        TransactionHistory.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...userIncludeTransactions }]);
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
            message: 'Transction history found',
            data: [{ ...userIncludeTransactions }]
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
            message: 'Transction history found',
            data: [{ ...userIncludeTransactions }]
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            user: { id: 2, roleId: 1 }
        });
        const res = mockResponse();

        TransactionHistory.findAll = jest.fn().mockImplementation(() => []);

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Transction history not found',
            data: null
        });
    });
});

describe('GET /api/v1/transactions/history/:id', () => {
    beforeEach(() => {
        TransactionHistory.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...userIncludeTransactions }]);
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

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Transction history found',
            data: [{ ...userIncludeTransactions }]
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
            message: 'Transction history found',
            data: [{ ...userIncludeTransactions }]
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
                msg: 'Id must be an integer',
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
            message: 'Validation error',
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
        TransactionHistory.findAll = jest.fn().mockImplementation(() => []);

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Transction history not found',
            data: null
        });
    });
});
