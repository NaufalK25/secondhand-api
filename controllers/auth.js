const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { Profile, User } = require('../models');
const { badRequest } = require('./error');

module.exports = {
    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: true
        })
            .status(200)
            .json({
                success: true,
                message: 'Login success',
                data: user
            });
    },
    logout: (req, res) => {
        res.clearCookie('token').status(200).json({
            success: true,
            message: 'Logout success',
            data: null
        });
    },
    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { name, email, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        const profile = await Profile.create({ userId: user.id, name });

        res.status(201).json({
            success: true,
            message: 'Register success',
            data: { user, profile }
        });
    }
};