const fs = require('fs/promises');
const path = require('path');
const { validationResult } = require('express-validator');
const { findByUser, update } = require('../../../controllers/profile');
const { Profile, User } = require('../../../models');
const { uploadImage } = require('../../../utils/cloudinary');

process.env.NODE_ENV = 'test';

const mockRequest = ({ body, user, file, originalUrl } = {}) => ({
    body,
    user,
    file,
    originalUrl
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
    profilePicture:
        'https://res.cloudinary.com/dko04cygp/image/upload/v1656654290/profiles/default.png',
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
jest.mock('../../../utils/cloudinary');

describe('GET /api/v1/user/profile', () => {
    beforeEach(() => {
        Profile.findOne = jest
            .fn()
            .mockImplementation(() => ({ ...profileGetById }));
    });
    afterEach(() => jest.clearAllMocks());
    test('200 OK', async () => {
        const req = mockRequest({ user: { id: 1 } });
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
            data: { ...profileGetById }
        });
    });
});

describe('PUT /api/v1/user/profile', () => {
    beforeEach(() => {
        uploadImage.mockImplementation(() => ({
            secure_url:
                'https://res.cloudinary.com/dko04cygp/image/upload/v1656665571/tests/profiles/1.png'
        }));
        fs.unlink.mockImplementation(() => Promise.resolve());
        Profile.findOne = jest.fn().mockImplementation(() => ({ ...profile }));
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
            file: {
                path: path.join(
                    __dirname,
                    '..',
                    '..',
                    'resources',
                    'profile.jpg'
                )
            }
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
                profilePicture:
                    'https://res.cloudinary.com/dko04cygp/image/upload/v1656665571/tests/profiles/1.png'
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
