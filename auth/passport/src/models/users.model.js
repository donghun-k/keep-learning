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
  },
});

// 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = User;
