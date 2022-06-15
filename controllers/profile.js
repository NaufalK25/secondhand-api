const fs = require('fs');
const { validationResult } = require('express-validator');
const { User, Profile } = require('../models');
const { badRequest, internalServerError, notFound } = require('./error');

module.exports = {
    findbyID: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const profilePicturePath = `${baseUrl}/images/profiles/`;
        const profile = await Profile.findByPk(req.query.id, {
            include: [{ model: User }]
        });
        if (!profile) return notFound(req, res);
        if (profile)
            profile.profilePicture = `${profilePicturePath}${profile.profilePicture}`;

        res.status(200).json({
            success: true,
            message: 'Profile found',
            data: profile
        });
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const unlinkProfilePicturePath = `${__dirname}/../uploads/profiles/`;
        const profile = await Profile.findByPk(req.query.id, {
            include: [{ model: User }]
        });
        const updatedData = {};
        if (!profile) return notFound(req, res);

        if (req.file) {
            if (profile.profilePicture !== 'default.png') {
                fs.unlink(
                    `${unlinkProfilePicturePath}${profile.profilePicture}`,
                    err => {
                        if (err) return internalServerError(err, req, res);
                    }
                );
            }
            updatedData.profilePicture = req.file.filename;
        }

        const { userId, name, phoneNumber, cityId, address } = req.body;
        if (profile.userId !== userId)
            updatedData.userId = userId || profile.userId;
        if (profile.name !== name) updatedData.name = name || profile.name;
        if (profile.phoneNumber !== phoneNumber)
            updatedData.phoneNumber = phoneNumber || profile.phoneNumber;
        if (profile.cityId !== cityId)
            updatedData.cityId = cityId || profile.cityId;
        if (profile.address !== address)
            updatedData.address = address || profile.address;

        await Profile.update(updatedData, { where: { id: req.query.id } });

        res.status(201).json({
            success: true,
            message: 'Update profile successful',
            data: {
                id: req.query.id,
                ...updatedData
            }
        });
    }
};
