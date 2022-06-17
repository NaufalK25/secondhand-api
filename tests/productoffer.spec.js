const { validationResult } = require('express-validator');
const { create, findByUser } = require('../controllers/productoffer');
const { Product, ProductOffer } = require('../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ user, body } = {}) => ({ user, body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const date = new Date();
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
const productOffer = {
    productId: 1,
    buyerId: 1,
    priceOffer: 100,
    status: 'Pending',
    createdAt: date,
    updatedAt: date
};

jest.mock('express-validator');

describe('POST /api/v1/products/offer', () => {
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
            message: 'Product Offer created',
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
describe('GET /api/v1/products/offer', () => {
    beforeEach(() => {
        ProductOffer.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productOffer }]);
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
            message: 'Product Offer found',
            data: [{ ...productOffer }]
        });
    });
});
