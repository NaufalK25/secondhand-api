const { findAll } = require('../controllers/city');
const { City } = require('../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({} = {}) => ({});
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const date = new Date();
const city = {
    id: 1,
    city: 'Kota Surabaya',
    createdAt: date,
    updatedAt: date
};

describe('GET /api/v1/cities', () => {
    beforeEach(() => {
        City.findAll = jest.fn().mockImplementation(() => [{ ...city }]);
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'City successful',
            data: [{ ...city }]
        });
    });
});
