const fs = require('fs/promises');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const {
    create,
    findAll,
    findById,
    findBySeller,
    search
} = require('../../controllers/product');
const {
    City,
    Profile,
    Product,
    ProductCategory,
    ProductCategoryThrough,
    ProductResource,
    User,
    Wishlist,
    sequelize
} = require('../../models');

process.env.NODE_ENV = 'test';

process.env.NODE_ENV = 'test';

const mockRequest = ({ user, body, params, query, files, protocol } = {}) => ({
    user,
    body,
    params,
    query,
    files,
    protocol,
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
const category = {
    id: 1,
    category: 'Fashion',
    createdAt: date,
    updatedAt: date
};
const productResource = {
    id: 1,
    productId: 1,
    filename: 'product.jpg',
    createdAt: date,
    updatedAt: date
};
const productFindAll = {
    ...product,
    ProductCategories: [{ ...category }],
    ProductResources: [{ ...productResource }]
};
const productFindBySeller = {};
const productFindById = {};

jest.mock('fs/promises');
jest.mock('express-validator');
jest.mock('sequelize');

describe('GET /api/v1/products', () => {
    beforeEach(() => {
        Product.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productFindAll }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ protocol: 'http' });
        const res = mockResponse();

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Product found',
            data: [{ ...productFindAll }]
        });
    });
    test('404 Not ', async () => {
        const req = mockRequest({ protocol: 'http' });
        const res = mockResponse();

        Product.findAll = jest.fn().mockImplementation(() => []);

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Product not found',
            data: null
        });
    });
});

describe('POST /api/v1/products', () => {
    beforeEach(() => {});
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {});
    test('400 Bad Request', async () => {});
});

describe('GET /api/v1/products/search', () => {
    beforeEach(() => {});
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {});
    test('400 Bad Request', async () => {});
    test('404 Not ', async () => {});
});

describe('GET /api/v1/user/products', () => {
    beforeEach(() => {});
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {});
    test('400 Bad Request', async () => {});
    test('404 Not ', async () => {});
});

describe('GET /api/v1/user/products/:productId', () => {
    beforeEach(() => {});
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {});
    test('400 Bad Request', async () => {});
    test('404 Not ', async () => {});
});
