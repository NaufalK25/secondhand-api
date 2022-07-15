const { validationResult } = require('express-validator');
const {
    create,
    findByUser,
    update,
    findById
} = require('../../../controllers/productoffer');
const {
    Notification,
    Product,
    ProductOffer,
    Transaction,
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
const productOffer = {
    id: 1,
    productId: 1,
    buyerId: 1,
    priceOffer: 100,
    status: null,
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
const wishlist = {
    id: 1,
    userId: 1,
    productId: 1,
    createdAt: date,
    updatedAt: date
};
const transaction = {
    id: 1,
    productOfferId: 1,
    buyerId: 1,
    transactionDate: date,
    fixPrice: 100,
    status: null,
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
const productOfferGetByUser = {
    ...productOffer,
    Product: { ...product, ProductResource: { ...productResource } }
};
const productOfferGetById = {
    ...productOffer,
    Product: { ...product, ProductResource: { ...productResource } },
    User: { ...user, Profile: { ...profile, City: { ...city } } }
};
const productOfferPut = {
    ...productOffer,
    Product: { ...product, User: { ...user } }
};

jest.mock('express-validator');

describe('GET /api/v1/products/offers', () => {
    beforeEach(() => {
        ProductOffer.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...productOfferGetByUser }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK (Seller)', async () => {
        const req = mockRequest({ user: { id: 1, roleId: 2 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Penawaran produk ditemukan',
            data: [{ ...productOfferGetByUser }]
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
            message: 'Penawaran produk ditemukan',
            data: [{ ...productOfferGetByUser }]
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
            message: 'Penawaran produk tidak ditemukan',
            data: null
        });
    });
});

describe('GET /api/v1/products/offer/:id', () => {
    beforeEach(() => {
        ProductOffer.findByPk = jest
            .fn()
            .mockImplementation(() => [{ ...productOfferGetById }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({
            user: { id: 1, roleId: 2 },
            params: { id: 1 }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        ProductOffer.findByPk = jest
            .fn()
            .mockImplementation(() => [{ ...productOfferGetById }]);

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Penawaran produk ditemukan',
            data: [{ ...productOfferGetById }]
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
        const req = mockRequest({ user: { id: 1 }, params: { id: 10 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        ProductOffer.findByPk = jest.fn().mockImplementation(() => null);

        await findById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Penawaran produk tidak ditemukan',
            data: null
        });
    });
});

describe('POST /api/v1/products/offers', () => {
    beforeEach(() => {
        Wishlist.create = jest.fn().mockImplementation(() => ({ ...wishlist }));
        Notification.create = jest.fn().mockImplementation(() => ({
            ...notification
        }));
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
        ProductOffer.findOne = jest.fn().mockImplementation(() => null);

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Penawaran produk berhasil dibuat',
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
    test('403 Forbidden', async () => {
        const req = mockRequest({
            user: { id: 1 },
            body: { productId: 1, priceOffer: 100 }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        ProductOffer.findOne = jest
            .fn()
            .mockImplementation(() => ({ ...productOffer }));

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Anda sudah menawar produk ini',
            data: null
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
            message: 'Produk tidak ditemukan',
            data: null
        });
    });
});

describe('PUT /api/v1/products/offer/:id', () => {
    beforeEach(() => {
        Notification.update = jest.fn().mockImplementation(() => ({
            ...notification
        }));
        ProductOffer.findByPk = jest.fn().mockImplementation(() => ({
            ...productOfferPut
        }));
        ProductOffer.update = jest
            .fn()
            .mockImplementation(() => ({ status: null }));
        Transaction.create = jest
            .fn()
            .mockImplementation(() => ({ ...transaction }));
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
            message: 'Penawaran produk berhasil diperbarui',
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
            message: 'Penawaran produk berhasil diperbarui',
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
            message:
                'Anda tidak diperbolehkan untuk memperbarui penawaran produk ini',
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
            message: 'Penawaran produk tidak ditemukan',
            data: null
        });
    });
});
