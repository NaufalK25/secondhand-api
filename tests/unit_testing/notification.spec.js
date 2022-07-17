const { validationResult } = require('express-validator');
const { findByUser, update } = require('../../controllers/notification');
const { Notification } = require('../../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ user, params, query } = {}) => ({ user, params, query });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const date = new Date();
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
const productResource = {
    id: 1,
    productId: 1,
    filename: 'product.jpg',
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
const notificationGet = {
    ...notification,
    Product: { ...product, ProductResources: [{ ...productResource }] },
    ProductOffer: { ...productOffer }
};

jest.mock('express-validator');

describe('GET /api/v1/notifications', () => {
    beforeEach(() => {
        Notification.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...notificationGet }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 }, query: { limit: '' } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Notifikasi ditemukan',
            data: [{ ...notificationGet }]
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ user: { id: 1 }, query: { limit: 'a' } });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Limit harus berupa angka',
                param: 'limit',
                location: 'query'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({ user: { id: 1 }, query: { limit: '' } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Notification.findAll = jest.fn().mockImplementation(() => []);

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Notifikasi tidak ditemukan',
            data: null
        });
    });
});

describe('PUT /api/v1/notifications/:id', () => {
    beforeEach(() => {
        Notification.findByPk = jest
            .fn()
            .mockImplementation(() => ({ ...notification }));
        Notification.update = jest
            .fn()
            .mockImplementation(() => ({ ...notification }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 }, params: { id: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Notifikasi berhasil diperbarui',
            data: null
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({ user: { id: 1 }, params: { id: '' } });
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

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({ user: { id: 1 }, params: { id: 1 } });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));
        Notification.findByPk = jest.fn().mockImplementation(() => null);

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Notifikasi tidak ditemukan',
            data: null
        });
    });
});
