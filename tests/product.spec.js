const { findAll } = require('../controllers/product');
const { Product } = require('../models');

process.env.NODE_ENV = 'test';

process.env.NODE_ENV = 'test';

const mockRequest = ({ user } = {}) => ({ user });
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

describe('GET /api/v1/products', () => {
    beforeEach(() => {
        Product.findAll = jest.fn().mockImplementation(() => [{ ...product }]);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 } });
        const res = mockResponse();

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Product successful',
            data: [{ ...product }]
        });
    });
});
