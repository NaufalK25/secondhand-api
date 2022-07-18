const fs = require('fs/promises');
const path = require('path');
const { validationResult } = require('express-validator');
const {
    create,
    filterByCategory,
    findAll,
    findById,
    findBySeller,
    search
} = require('../../../controllers/product');
const {
    Notification,
    Product,
    ProductCategory,
    ProductCategoryThrough,
    ProductResource
} = require('../../../models');
const { uploadImage } = require('../../../utils/cloudinary');

process.env.NODE_ENV = 'test';

const mockRequest = ({ user, body, params, query, files } = {}) => ({
    user,
    body,
    params,
    query,
    files
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
const product = {
    id: 1,
    sellerId: 1,
    name: 'Product',
    price: 100,
    publishDate: date,
    description: 'Product description',
    status: false,
    createdAt: date,
    updatedAt: date
};
const category = {
    id: 1,
    category: 'Hobi',
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
    Wishlists: [{ ...wishlist }],
    ProductOffers: [{ ...productOffer }]
};
const productFindById = {
    ...product,
    ProductCategories: [{ ...category }],
    ProductResources: [{ ...productResource }],
    User: { ...user, Profile: { ...profile, City: { ...city } } }
};
const productFilter = {
    Product: {
        ...product,
        ProductCategories: [{ ...category }],
        ProductResources: [{ ...productResource }]
    }
};

jest.mock('fs/promises');
jest.mock('express-validator');
jest.mock('../../../utils/cloudinary');

describe('GET /api/v1/products', () => {
    beforeEach(() => {
        Product.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productFindAll }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest();
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
        const req = mockRequest();
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

describe('GET /api/v1/products/:id', () => {
    beforeEach(() => {
        Product.findOne = jest.fn().mockImplementation(() => ({ ...product }));
        Product.findByPk = jest
            .fn()
            .mockImplementation(() => ({ ...productFindById }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ params: { productId: 1 } });
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
        const req = mockRequest({ params: { productId: '' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Id produk harus diisi',
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
        const req = mockRequest({ params: { productId: 1 } });
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

describe('GET /api/v1/products/search', () => {
    beforeEach(() => {
        Product.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productFindAll }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ query: { keyword: 'prod' } });
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
        const req = mockRequest({ query: { keyword: '' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Kata kunci harus diisi',
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
        const req = mockRequest({ query: { keyword: 'prod' } });
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

describe('GET /api/v1/products/filter', () => {
    beforeEach(() => {
        ProductCategory.findOne = jest
            .fn()
            .mockImplementation(() => ({ ...category }));
        ProductCategoryThrough.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productFilter }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ query: { category: 'hobi' } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await filterByCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Produk ditemukan',
            data: [{ ...productFilter }]
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ query: { category: '' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Kategori harus diisi',
                param: 'category',
                location: 'query'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await filterByCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({ query: { category: 'hobi' } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        ProductCategoryThrough.findAll = jest.fn().mockImplementation(() => []);

        await filterByCategory(req, res);

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
        Product.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productFindBySeller }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 }, query: { sortBy: '' } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findBySeller(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Produk ditemukan',
            data: [{ ...productFindBySeller }]
        });
    });
    test('200 OK (sold)', async () => {
        const req = mockRequest({ user: { id: 1 }, query: { sortBy: 'sold' } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findBySeller(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Produk ditemukan',
            data: [{ ...productFindBySeller }]
        });
    });
    test('200 OK (wishlist)', async () => {
        const req = mockRequest({
            user: { id: 1 },
            query: { sortBy: 'wishlist' }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findBySeller(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Produk ditemukan',
            data: [{ ...productFindBySeller }]
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            user: { id: 1 },
            query: { sortBy: 1 }
        });
        const res = mockResponse();
        const errors = [
            {
                value: 1,
                msg: 'Sort by harus berupa huruf',
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
            query: { sortBy: '' }
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

describe('POST /api/v1/user/products', () => {
    beforeEach(() => {
        uploadImage.mockImplementation(() => ({
            secure_url:
                'https://res.cloudinary.com/dko04cygp/image/upload/v1656665571/tests/products/1/1-1.png'
        }));
        fs.unlink.mockImplementation(() => Promise.resolve());
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
        Product.findAll = jest.fn().mockImplementation(() => [{ ...product }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('201 Created', async () => {
        const req = mockRequest({
            user: { id: 1 },
            body: {
                categories: [1],
                name: 'Product',
                price: 100,
                description: 'Product description',
                status: true
            },
            files: [
                {
                    path: path.join(
                        __dirname,
                        '..',
                        '..',
                        'resources',
                        'product.jpg'
                    )
                }
            ]
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
    test('201 Created (categories string)', async () => {
        const req = mockRequest({
            user: { id: 1 },
            body: {
                categories: '1',
                name: 'Product',
                price: 100,
                description: 'Product description',
                status: true
            },
            files: [
                {
                    path: path.join(
                        __dirname,
                        '..',
                        '..',
                        'resources',
                        'product.jpg'
                    )
                }
            ]
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
                description: 'Product description',
                status: true
            },
            files: [
                {
                    path: path.join(
                        __dirname,
                        '..',
                        '..',
                        'resources',
                        'product.jpg'
                    )
                }
            ]
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Nama produk harus diisi',
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
    test('403 Forbidden', async () => {
        const req = mockRequest({ user: { id: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Product.findAll = jest
            .fn()
            .mockImplementation(() => [[], [], [], [], []]);

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Anda hanya bisa memposting 4 produk',
            data: null
        });
    });
});
