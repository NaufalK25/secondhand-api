const errorController = require('../controllers/error');

const mockRequest = ({ method, path } = {}) => ({ method, path });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe('errorController', () => {
    test('400 Bad Request', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.badRequest([], req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            data: [],
            message:"Validation error",
            success:false
        });
    });
    test('401 Unauthorized', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.unAuthorized(req, res);

        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({
            data: null,
            message:"Unauthorized",
            success:false
        });
    });
    test('403 Forbidden', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.forbidden(req, res);

        expect(res.status).toBeCalledWith(403);
        expect(res.json).toBeCalledWith({
            data: null,
            message:"Forbidden",
            success:false
        });
    });
    test('404 Not Found', () => {
        const req = mockRequest({ path: '/api/v1/profiles' });
        const res = mockResponse();

        errorController.notFound(req, res);

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({
            data: null,
            message: `Endpoint ${req.path} not found`,
            success:false
        });
    });
    test('405 Method Not Allowed', () => {
        const req = mockRequest({ method: 'POST', path: '/api/v1/profile' });
        const res = mockResponse();

        errorController.methodNotAllowed(req, res);

        expect(res.status).toBeCalledWith(405);
        expect(res.json).toBeCalledWith({
            data: null,
            message: `Method ${req.method} not allowed at endpoint ${req.path}`,
            success:false
        });
    });
    test('500 Internal Server Error', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.internalServerError('Internal Server Error', req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            data: null,
            message: 'Internal Server Error',
            success:false
        });
    });
    test('500 Internal Server Error with message', () => {
        const req = mockRequest();
        const res = mockResponse();

        errorController.internalServerError(new Error('Internal Server Error'), req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            data: null,
            message: 'Internal Server Error',
            success:false
        });
     });
})
