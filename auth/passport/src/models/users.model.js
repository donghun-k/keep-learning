const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 스키마 정의
const userSchema = mongoose.Schema({
  // 일반 로그인
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  // 구글 로그인
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  // 카카오 로그인
  kakaoId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const saltRounds = 10;

userSchema.pre('save', function (next) {
  // pre: save 메소드 실행 전에 무언가를 한다는 의미
  let user = this;
  if (user.isModified('password')) {
    // 비밀번호가 변경되었을 때만 실행
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hashed) {
        if (err) return next(err);
        user.password = hashed;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatched) {
    if (err) return cb(err);
    cb(null, isMatched);
  });
};

// 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = User;
