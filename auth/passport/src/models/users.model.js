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
});

const saltRounds = 10;

userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
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
