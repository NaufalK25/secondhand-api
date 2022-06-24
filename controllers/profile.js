const fs = require('fs/promises');
const { validationResult } = require('express-validator');
const { City, Profile, User } = require('../models');
const { badRequest } = require('./error');

module.exports = {
    findByUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const profilePicturePath = `${baseUrl}/images/profiles/`;
        const profile = await Profile.findOne({
            where: { userId: req.user.id },
            include: [{ model: City }]
        });
        profile.profilePicture = `${profilePicturePath}${profile.profilePicture}`;

        res.status(200).json({
            success: true,
            message: 'Profil ditemukan',
            data: profile
        });
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (req.file) await fs.unlink(req.file.path);

            return badRequest(errors.array(), req, res);
        }

        const updatedData = {};
        const profile = await Profile.findOne({
            where: { userId: req.user.id }
        });

        if (req.file) {
            if (profile.profilePicture !== 'default.png') {
                fs.unlink(
                    `${__dirname}/../uploads/profiles/${profile.profilePicture}`
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
            message: 'Profil diperbarui',
            data: {
                id: req.user.id,
                ...updatedData
            }
        });
    }
};
