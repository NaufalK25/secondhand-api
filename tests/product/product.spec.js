const { findBySeller } = require('../../controllers/product');
const { Product } = require('../../models');

process.env.NODE_ENV = 'test';

process.env.NODE_ENV = 'test';

const mockRequest = ({ user } = {}) => ({ user });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
