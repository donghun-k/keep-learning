const mongoose = require('mongoose');

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

userSchema.methods.comparePassword = function (plainPassword, cb) {
  if (plainPassword === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  return cb({ error: 'error' });
};

// 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = User;
