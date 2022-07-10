const fs = require('fs/promises');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mustache = require('mustache');
const nodemailer = require('nodemailer');
const { v4 } = require('uuid');
const { validationResult } = require('express-validator');
const { Profile, User } = require('../models');
const { badRequest, forbidden, notFound } = require('./error');

const tokens = {};

module.exports = {
    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return notFound(req, res, 'Pengguna tidak ditemukan');

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );

        res.cookie('token', token).status(200).json({
            success: true,
            message: 'Berhasil masuk',
            data: null
        });
    },
    logout: (req, res) => {
        res.clearCookie('token').status(200).json({
            success: true,
            message: 'Berhasil keluar',
            data: null
        });
    },
    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const template = await fs.readFile(
            `${__dirname}/../controllers/helpers/welcome_mail.html`,
            { encoding: 'utf-8' }
        );
        const payload = { ...req.body };
        const { name, email, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        await Profile.create({
            userId: user.id,
            name,
            profilePicture:
                'https://res.cloudinary.com/dko04cygp/image/upload/v1657013827/profiles/default.png'
        });

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
        const mailOptions = {
            from: process.env.MAILAPP,
            to: email,
            subject: `Selamat datang di Secondhand, ${name}`,
            html: mustache.render(template, { ...payload })
        };

        //Step 3: Sending email
        transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            message: 'Berhasil registrasi',
            data: null
        });
    },
    forgotPassword: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const template = await fs.readFile(
            `${__dirname}/../controllers/helpers/forgot_password.html`,
            { encoding: 'utf-8' }
        );
        const payload = { ...req.body };
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return notFound(req, res, 'Pengguna tidak ditemukan');

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            service: 'Gmail',
            auth: {
                user: process.env.MAILAPP,
                pass: process.env.PASSWORD_MAILAPP
            }
        });

        const token = v4().replace(/-/g, '');
        tokens[user.id] = token;

        const mailOptions = {
            from: process.env.MAILAPP,
            to: email,
            subject: 'Lupa Password',
            // html: mustache.render(template, { ...payload }),
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lupa Password</title>
            </head>
            <body>
                <form action=${baseUrl}/auth/reset-password method="POST">
                    <input type="hidden" name="token" value="${token}">
                    <input type="hiden" name="email" value="${email}">
                    <button type="submit">Klik disini untuk mereset password</button>
            </body>
            </html>`
        };

        transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Email berhasil dikirim',
            data: null
        });
    },
    resetPassword: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

        const { email, token, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return notFound(req, res, 'Pengguna tidak ditemukan');
        if (tokens[user.id] !== token)
            return forbidden(req, res, 'Token tidak valid');

        const hashedPassword = await bcryptjs.hash(password, 10);
        await User.update({ password: hashedPassword }, { where: { email } });

        res.status(200).json({
            success: true,
            message: 'Password berhasil direset',
            data: null
        });
    }
};
