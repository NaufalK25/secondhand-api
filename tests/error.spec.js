const errorController = require('../controllers/error');

const mockRequest = ({ method, originalUrl } = {}) => ({ method, originalUrl });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('errorController', () => {
    test('400 Bad request', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.badRequest([], req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: []
        });
    });
    test('401 Unauthorized', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.unAuthorized(req, res);

        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Tidak sah',
            data: null
        });
    });
    test('403 Forbiden', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.forbidden(req, res);

        expect(res.status).toBeCalledWith(403);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Terlarang',
            data: null
        });
    });
    test('404 Not found', () => {
        const req = mockRequest({ originalUrl: '/api/v1/user/profile' });
        const res = mockResponse();

        errorController.notFound(req, res);

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({
            success: false,
            message: `Endpoint ${req.originalUrl} Tidak ditemukan`,
            data: null
        });
    });
    test('404 Not found (Default)', () => {
        const req = mockRequest({ originalUrl: '/api/v1/user/profile' });
        const res = mockResponse();

        errorController.notFoundDefault(req, res);

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({
            success: false,
            message: `Endpoint ${req.originalUrl} Tidak ditemukan`,
            data: null
        });
    });
    test('405 Method not allowed)', () => {
        const req = mockRequest({
            method: 'POST',
            originalUrl: '/api/v1/user/profile'
        });
        const res = mockResponse();

        errorController.methodNotAllowed(req, res);

        expect(res.status).toBeCalledWith(405);
        expect(res.json).toBeCalledWith({
            success: false,
            message: `Method ${req.method} not allowed at endpoint ${req.originalUrl}`,
            data: null
        });
    });
    test('500 Internal Server Error', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.internalServerError('Kesalahan Internal Server', req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Kesalahan Internal Server',
            data: null
        });
    });
    test('500 Internal Server Error with message', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.internalServerError(
            new Error('Kesalahan Internal Server'),
            req,
            res
        );

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Kesalahan Internal Server',
            data: null
        });
    });
});
