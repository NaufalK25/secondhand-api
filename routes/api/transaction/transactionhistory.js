const express = require('express');
const { param } = require('express-validator');
const passport = require('../../../middlewares/passport');
const {
    internalServerError,
    methodNotAllowed,
    unAuthorized
} = require('../../../controllers/error');
const { findByUser } = require('../../../controllers/transactionhistory');
const router = express.Router();

router
    .route('/history/:id')
    .get(
        (req, res, next) => {
            passport.authenticate(
                'jwt',
                { session: false },
                async (err, user, info) => {
                    if (err) return internalServerError(err, req, res);
                    if (!user) return unAuthorized(req, res);
                    req.user = user;
                    next();
                }
            )(req, res, next);
        },
        findByUser
    )
    .all(methodNotAllowed);

module.exports = router;
