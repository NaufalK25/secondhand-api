const errorController = require('../controllers/error');

const mockRequest = ({ method, path } = {}) => ({ method, path });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('errorController', () => {
    test('400 Bad Request', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.badRequest([], req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Validation error',
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
            message: 'Unauthorized',
            data: null
        });
    });
    test('403 Forbidden', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.forbidden(req, res);

        expect(res.status).toBeCalledWith(403);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Forbidden',
            data: null
        });
    });
    test('403 Forbidden (With Msg)', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.forbidden(req, res, 'Forbidden');

        expect(res.status).toBeCalledWith(403);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Forbidden',
            data: null
        });
    });
    test('404 Not Found', () => {
        const req = mockRequest({ path: '/api/v1/user/profile' });
        const res = mockResponse();

        errorController.notFound(req, res);

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({
            success: false,
            message: `Endpoint ${req.path} not found`,
            data: null
        });
    });
    test('404 Not Found (With Msg)', () => {
        const req = mockRequest({ path: '/api/v1/user/wishlists' });
        const res = mockResponse();

        errorController.notFound(req, res, 'Product Not Found');

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Product Not Found',
            data: null
        });
    });
    test('405 Method Not Allowed', () => {
        const req = mockRequest({
            method: 'POST',
            path: '/api/v1/user/profile'
        });
        const res = mockResponse();

        errorController.methodNotAllowed(req, res);

        expect(res.status).toBeCalledWith(405);
        expect(res.json).toBeCalledWith({
            success: false,
            message: `Method ${req.method} not allowed at endpoint ${req.path}`,
            data: null
        });
    });
    test('500 Internal Server Error', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.internalServerError('Internal Server Error', req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Internal Server Error',
            data: null
        });
    });
    test('500 Internal Server Error with message', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.internalServerError(
            new Error('Internal Server Error'),
            req,
            res
        );

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            success: false,
            message: 'Internal Server Error',
            data: null
        });
    });
});
