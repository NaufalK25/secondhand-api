const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const router = require('./routes');

const app = express();

app.set('trust proxy', 1);
app.use(
    cors({
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept'
        ],
        credentials: true,
        origin: [
            'http://localhost:3000',
            'https://secondhand-fe.vercel.app',
            'https://secondhand-fe.herokuapp.com'
        ]
    })
);
app.use(cookieParser());
app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: 'none',
            secure: true
        },
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || 'secret'
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(router);

module.exports = app;
