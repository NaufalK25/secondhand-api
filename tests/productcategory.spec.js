const { validationResult } = require('express-validator');
const { findAll } = require('../controllers/productcategory');
const { ProductCategory } = require('../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ body, params, originalUrl } = {}) => ({ body, params, originalUrl });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const date = new Date();
const category = 
    {
        id: 1,
        category: 'Fashion',
        createdAt: date,
        updatedAt: date
    };
jest.mock('express-validator');

describe('GET /api/v1/category', () => {
    beforeEach(() => {
        ProductCategory.findAll = jest.fn().mockImplementation(() => [{ ...category }]);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('200 OK', async () => {
        const req = mockRequest();
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Category successful',
            data: [category]
        });
    });
});
