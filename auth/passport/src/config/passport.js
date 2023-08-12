const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

// req.login(user) 호출 시
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// client => session => request
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const localStrategyConfig = new LocalStrategy( // 로컬 로그인 전략
  { usernameField: 'email', passwordField: 'password' },
  (email, password, done) => {
    User.findOne({ email: email.toLocaleLowerCase() }).then((user) => {
      console.log(user);
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    });
  }
);

const googleStrategyConfig = new GoogleStrategy( // 구글 로그인 전략
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['email', 'profile'],
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => {
      if (existingUser) {
        console.log('이미 존재하는 유저, 로그인 성공!');
        return done(null, existingUser);
      } else {
        const user = new User();
        user.email = profile.emails[0].value;
        user.googleId = profile.id;
        user.save().then((user) => {
          console.log('새로운 유저, 로그인 성공!');
          return done(null, user);
        });
      }
    });
  }
);

passport.use('local', localStrategyConfig);
passport.use('google', googleStrategyConfig);
