const fs = require('fs/promises');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mustache = require('mustache');
const nodemailer = require('nodemailer');
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

        res.cookie('token', token).status(200).json({
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
        const template = await fs.readFile(
            `${__dirname}/../controllers/helper/welcome_mail.html`,
            { encoding: 'utf-8' }
        );
        const payload = { ...req.body };
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { name, email, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        const profile = await Profile.create({ userId: user.id, name });

        //Step 1: Creating the transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            service: 'Gmail',
            auth: {
                user: process.env.MAILAPP,
                pass: process.env.PASSWORD_MAILAPP
            }
        });

        //Step 2: Setting up message options
        const messageOptions = {
            from: process.env.MAILAPP,
            to: email,
            subject: `Welcome to Secondhand, ${name}`,
            //html: htmlmail
            html: mustache.render(template, { ...payload })
        };

        //Step 3: Sending email
        transporter.sendMail(messageOptions);

        res.status(201).json({
            success: true,
            message: 'Register success',
            data: { user, profile }
        });
    },
    forgotPassword: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);
    },
    resetPassword: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);
    }
};
