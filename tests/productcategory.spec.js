const { findAll } = require('../controllers/productcategory');
const { ProductCategory } = require('../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({} = {}) => ({});
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const date = new Date();
const category = {
    id: 1,
    category: 'Fashion',
    createdAt: date,
    updatedAt: date
};

describe('GET /api/v1/products/categories', () => {
    beforeEach(() => {
        ProductCategory.findAll = jest
            .fn()
            .mockImplementation(() => [{ ...category }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Category successful',
            data: [{ ...category }]
        });
    });
});
