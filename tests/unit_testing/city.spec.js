const { findAll } = require('../../controllers/city');
const { City } = require('../../models');

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
            message: 'Kota ditemukan',
            data: [{ ...city }]
        });
    });
    test('404 Tidak Ditemukan', async () => {
        const req = mockRequest();
        const res = mockResponse();

        City.findAll = jest.fn().mockImplementation(() => []);

        await findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kota tidak ditemukan',
            data: null
        });
    });
});
