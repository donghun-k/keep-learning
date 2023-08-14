const express = require('express');
const mainRouter = express.Router();

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require('../middlewares/auth');

mainRouter.get('/', checkAuthenticated, (req, res) => {
  res.render('index');
});

mainRouter.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

mainRouter.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('signup');
});

module.exports = mainRouter;
