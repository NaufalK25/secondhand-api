const { findByUser } = require('../controllers/notification');
const { Notification } = require('../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ user } = {}) => ({ user });
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

describe('GET /api/v1/notifications', () => {
    beforeEach(() => {
        Notification.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...notificationGet }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 } });
        const res = mockResponse();

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Notifikasi ditemukan',
            data: [{ ...notificationGet }]
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest({ user: { id: 1 } });
        const res = mockResponse();

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
