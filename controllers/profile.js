const fs = require('fs/promises');
const { validationResult } = require('express-validator');
const { Profile, User } = require('../models');
const { badRequest, internalServerError } = require('./error');

module.exports = {
    findByUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const profilePicturePath = `${baseUrl}/images/profiles/`;
        const profile = await Profile.findOne(
            { where: { userId: req.user.id } },
            { include: [{ model: User }] }
        );
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
        const profile = await Profile.findOne(
            { where: { userId: req.user.id } },
            { include: [{ model: User }] }
        );
        const updatedData = {};

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

        if (req.body.name) updatedData.name = req.body.name || profile.name;
        if (req.body.userId)
            updatedData.userId = req.body.userId || profile.userId;
        if (req.body.name) updatedData.name = req.body.name || profile.name;
        if (req.body.phoneNumber)
            updatedData.phoneNumber =
                req.body.phoneNumber || profile.phoneNumber;
        if (req.body.cityId)
            updatedData.cityId = req.body.cityId || profile.cityId;
        if (req.body.address)
            updatedData.address = req.body.address || profile.address;

        await Profile.update(updatedData, { where: { userId: req.user.id } });
        await User.update({ roleId: 2 }, { where: { id: req.user.id } }); // change to seller

        res.status(200).json({
            success: true,
            message: 'Profile updated',
            data: {
                id: req.user.id,
                ...updatedData
            }
        });
    }
};
