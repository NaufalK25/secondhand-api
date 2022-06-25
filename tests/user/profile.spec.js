const fs = require('fs/promises');
const { validationResult } = require('express-validator');
const { findByUser, update } = require('../../controllers/profile');
const { Profile, User } = require('../../models');

process.env.NODE_ENV = 'test';

const mockRequest = ({ body, user, file, protocol, originalUrl } = {}) => ({
    body,
    user,
    file,
    protocol,
    originalUrl,
    get: jest.fn().mockImplementation(header => {
        if (header === 'host') return 'localhost:8000';
    })
});
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const date = new Date();
const user = {
    id: 1,
    email: 'johndoe@gmail.com',
    password: '12345678',
    createdAt: date,
    updatedAt: date
};
const profile = {
    id: 1,
    userId: 1,
    name: 'John Doe',
    profilePicture: 'profilePicture.jpg',
    phoneNumber: '081234567890',
    cityId: 1,
    address: 'Jl. Kebon Jeruk No. 1',
    createdAt: date,
    updatedAt: date
};
const city = {
    id: 1,
    city: 'Kota Surabaya',
    createdAt: date,
    updatedAt: date
};
const profileGetById = { ...profile, City: { ...city } };

jest.mock('fs/promises');
jest.mock('express-validator');

describe('GET /api/v1/user/profile', () => {
    beforeEach(() => {
        Profile.findOne = jest
            .fn()
            .mockImplementation(() => ({ ...profileGetById }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 }, protocol: 'http' });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await findByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Profil ditemukan',
            data: {
                ...profileGetById,
                profilePicture: `${req.protocol}://${req.get(
                    'host'
                )}/images/profiles/profilePicture.jpg`
            }
        });
    });
});

describe('PUT /api/v1/user/profile', () => {
    beforeEach(() => {
        fs.unlink.mockImplementation(() => Promise.resolve());
        Profile.findOne = jest
            .fn()
            .mockImplementation(() => ({ ...profile }));
        Profile.update = jest.fn().mockImplementation(() => ({ ...profile }));
        User.update = jest.fn().mockImplementation(() => ({ ...user }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({
            body: {
                userId: 1,
                name: 'John Doe',
                phoneNumber: '081234567890',
                cityId: 1,
                address: 'Jl. Kebon Jeruk No. 1'
            },
            user: { id: 1 },
            file: { filename: 'profilePicture.jpg' }
        });
        const res = mockResponse();

        validationResult.mockImplementation(() => ({
            isEmpty: () => true,
            array: () => []
        }));

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Profil berhasil diperbarui',
            data: {
                id: req.user.id,
                ...req.body,
                profilePicture: 'profilePicture.jpg'
            }
        });
    });
    test('400 Bad Request', async () => {
        const req = mockRequest({
            body: {
                phoneNumber: '',
                cityId: 1,
                address: 'Jl. Kebon Jeruk No. 1'
            },
            user: { id: 1 }
        });
        const res = mockResponse();
        const errors = [
            {
                value: '',
                msg: 'Nomor telepon harus diisi',
                param: 'phoneNumber',
                location: 'body'
            }
        ];

        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => errors
        }));

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Kesalahan validasi',
            data: errors
        });
    });
});
