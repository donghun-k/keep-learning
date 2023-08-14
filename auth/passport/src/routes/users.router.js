const express = require('express');
const passport = require('passport');
const User = require('../models/users.model');
const usersRouter = express.Router();

usersRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ msg: info });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  })(req, res, next);
});

usersRouter.post('/logout', (req, res, next) => {
  req.logOut(function (err) {
    if (err) return next(err);
    res.redirect('/login');
  });
});

usersRouter.post('/signup', async (req, res) => {
  // user 객체 생성
  const user = new User(req.body);
  try {
    // User 컬렉션에 user 객체 저장
    await user.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

usersRouter.get('/google', passport.authenticate('google'));
usersRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = usersRouter;
