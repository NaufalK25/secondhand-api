const { findAll } = require('../../../controllers/productcategory');
const { ProductCategory } = require('../../../models');

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
    category: 'Hobi',
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
            message: 'Kategori ditemukan',
            data: [{ ...category }]
        });
    });
    test('404 Not Found', async () => {
        const req = mockRequest();
        const res = mockResponse();

        ProductCategory.findAll = jest.fn().mockImplementation(() => []);

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kategori tidak ditemukan',
            data: null
        });
    });
});
