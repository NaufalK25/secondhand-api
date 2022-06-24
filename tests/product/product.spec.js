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
    Notification,
    Product,
    ProductCategoryThrough,
    ProductResource
} = require('../../models');

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
const city = {
    id: 1,
    city: 'Kota Surabaya',
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
const category = {
    id: 1,
    category: 'Fashion',
    createdAt: date,
    updatedAt: date
};
const productCategoryThrough = {
    id: 1,
    productId: 1,
    productCategoryId: 1,
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
const wishlist = {
    id: 1,
    userId: 1,
    productId: 1,
    createdAt: date,
    updatedAt: date
};
const notification = {
    id: 1,
    userId: 1,
    productId: 1,
    productOfferId: null,
    type: 'Berhasil di terbitkan',
    description: null,
    createdAt: date,
    updatedAt: date
};
const productFindAll = {
    ...product,
    ProductCategories: [{ ...category }],
    ProductResources: [{ ...productResource }]
};
const productFindBySeller = {
    ...product,
    ProductCategories: [{ ...category }],
    ProductResources: [{ ...productResource }],
    Wishlists: [{ ...wishlist }]
};
const productFindById = {
    ...product,
    ProductCategories: [{ ...category }],
    ProductResources: [{ ...productResource }],
    User: { ...user, Profile: { ...profile, City: { ...city } } }
};

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
            message: 'Produk ditemukan',
            data: [{ ...productFindAll }]
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({ protocol: 'http' });
        const res = mockResponse();

        Product.findAll = jest.fn().mockImplementation(() => []);

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Produk tidak ditemukan',
            data: null
        });
    });
});

describe('POST /api/v1/products', () => {
    beforeEach(() => {
        fs.unlink = jest.fn().mockImplementation(() => Promise.resolve());
        Product.create = jest.fn().mockImplementation(() => ({ ...product }));
        ProductCategoryThrough.create = jest
            .fn()
            .mockImplementation(() => ({ ...productCategoryThrough }));
        ProductResource.create = jest
            .fn()
            .mockImplementation(() => ({ ...productResource }));
        Notification.create = jest
            .fn()
            .mockImplementation(() => ({ ...notification }));
    });
    afterEach(() => jest.clearAllMocks());
    test('201 Created', async () => {
        const req = mockRequest({
            user: { id: 1 },
            body: {
                categories: [1],
                name: 'Product',
                price: 100,
                stock: 10,
                sold: 0,
                description: 'Product description',
                status: true
            },
            files: [{ filename: 'product.jpg' }],
            protocol: 'http'
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
            message: 'Produk berhasil dibuat',
            data: { ...product }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            user: { id: 1 },
            body: {
                categories: [1],
                name: '',
                price: 100,
                stock: 10,
                sold: 0,
                description: 'Product description',
                status: true
            },
            files: [{ filename: 'product.jpg' }],
            protocol: 'http'
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Name is required',
                param: 'name',
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
});

describe('GET /api/v1/products/search', () => {
    beforeEach(() => {
        Product.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productFindAll }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({
            query: { keyword: 'prod' },
            protocol: 'http'
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await search(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Produk ditemukan',
            data: [{ ...productFindAll }]
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ query: { keyword: '' }, protocol: 'http' });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Keyword is required',
                param: 'keyword',
                location: 'query'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await search(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            query: { keyword: 'prod' },
            protocol: 'http'
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Product.findAll = jest.fn().mockImplementation(() => []);

        await search(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Produk tidak ditemukan',
            data: null
        });
    });
});

describe('GET /api/v1/user/products', () => {
    beforeEach(() => {
        Product.findALl = jest
            .fn()
            .mockImplementation(() => [{ ...productFindBySeller }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {});
    test('200 OK (sold)', async () => {});
    test('200 OK (wishlist)', async () => {});
    test('400 Bad Request', async () => {
        const req = mockRequest({
            user: { id: 1 },
            query: { sortBy: 1 },
            protocol: 'http'
        });
        const res = mockResponse();
        const errors = [
            {
                value: 1,
                msg: 'Sort by must be a string',
                param: 'sortBy',
                location: 'query'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await findBySeller(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({
            user: { id: 1 },
            query: { sortBy: '' },
            protocol: 'http'
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Product.findAll = jest.fn().mockImplementation(() => []);

        await findBySeller(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Produk tidak ditemukan',
            data: null
        });
    });
});

describe('GET /api/v1/user/products/:productId', () => {
    beforeEach(() => {
        Product.findByPk = jest
            .fn()
            .mockImplementation(() => ({ ...productFindById }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ params: { productId: 1 }, protocol: 'http' });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Produk ditemukan',
            data: { ...productFindById }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            params: { productId: '' },
            protocol: 'http'
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Product id is required',
                param: 'productId',
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
        const req = mockRequest({ params: { productId: 1 }, protocol: 'http' });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Product.findByPk = jest.fn().mockImplementation(() => null);

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Produk tidak ditemukan',
            data: null
        });
    });
});
