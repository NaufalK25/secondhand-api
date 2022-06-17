const fs = require('fs/promises');
const { validationResult } = require('express-validator');
const { User, Profile } = require('../models');
const { badRequest, internalServerError, notFound } = require('./error');

module.exports = {
    findbyID: async (req, res) => {
        const errors = validationResult(req);
        console.log(req.user.id)
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const profilePicturePath = `${baseUrl}/images/profiles/`;
        const profile = await Profile.findByPk(req.user.id, {
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
        const profile = await Profile.findByPk(req.user.id, {
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

        await Profile.update(updatedData, { where: { id: req.user.id } });
        await User.update({ roleId: 2 }, { where: { id: req.user.id } }); // change to seller

        res.status(200).json({
            success: true,
            message: 'Update profile successful',
            data: {
                id: req.user.id,
                ...updatedData
            }
        });
    }
};
