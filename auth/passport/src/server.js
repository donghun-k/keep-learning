const express = require('express');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/users.model');
require('./config/passport');
require('dotenv').config();

const PORT = 4000;

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res, next) => {
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
  });
});

app.get('/signup', (req, res) => {
  res.render('signup');
});
app.post('/signup', async (req, res) => {
  // user 객체 생성
  const user = new User(req.body);
  try {
    // User 컬렉션에 user 객체 저장
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
