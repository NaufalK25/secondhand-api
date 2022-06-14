const passport = require('passport');
const passportJWT = require('passport-jwt');
const { User } = require('../models');
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret'
    },
    async (payload, done) => {
      try {
        const user = await User.findByPk(payload.id);
        if (!user) return done(null, false, { message: 'User not found' });
        return done(null, user, { message: 'Logged in Successfully' });
      } catch (err) {
        return done(err, false, { message: 'Error while trying to log in' });
      }
    }
  )
);

module.exports = passport;
