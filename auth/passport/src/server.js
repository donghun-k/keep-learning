const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const config = require('config');
const mainRouter = require('./routes/main.router');
const usersRouter = require('./routes/users.router');
const serverConfig = config.get('server');
require('./config/passport');
require('dotenv').config();

const PORT = serverConfig.port || 4000;

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'cookie-session',
    keys: ['secret'],
  })
);
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});
app.use(passport.initialize());
app.use(passport.session());

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
  });

app.use('/static', express.static(path.join(__dirname, 'public'))); // 정적 파일 위치 설정

// 라우터 설정
app.use('/', mainRouter);
app.use('/auth', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
