const fs = require('fs');
const { validationResult } = require('express-validator');
const { Profile } = require('../models');

module.exports = {
  updateProfile: async (req, res) => {
    const errors = validationResult(req);

    const profile = await Profile.findByPk(req.body.userId);
    const updatedData = {};
    const profilePicture = req.file ? req.file.filename : 'default-profile.png';

    if (!profile){
        res.status(404).json({
            success: false,
            message: 'Profile is not found',
            data: null
        });
    }

    if (Object.keys(req.body).length > 0) {
        //const { userId, name, phoneNumber, cityId, address } = req.body;
        const { userId, name, phoneNumber, address } = req.body;
        if (profile.userId !== userId) updatedData.userId = userId;
        if (profile.name !== name) updatedData.name = name;
        if (profile.phoneNumber !== phoneNumber) updatedData.phoneNumber = phoneNumber;
        //if (profile.cityId !== cityId) updatedData.cityId = cityId;
        if (profile.address !== +address) updatedData.address = +address;
    }
    if (req.file && profilePicture !== 'default-profile.png') {
        updatedData.profilePicture = profilePicture;
        fs.unlink(`${unlinkProfilePicturePath}${profile.profilePicture}`, err => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error',
                    data: null
                });
            }
        });
    }

    if (Object.keys(updatedData).length === 0) {
        return res.status(200).json({
            success: true,
            message: 'No changes has been made',
            data: profile
        });
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: true,
            message: 'No changes has been made',
            data: errors.array()
        });
    }

    await Profile.update(updatedData, { where: { id: req.body.userId } });

    res.status(201).json({
        success: true,
        message: 'Update Profile successful',
        data:  profile 
    });
    },
};
